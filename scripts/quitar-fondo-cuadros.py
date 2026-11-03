"""Quita un fondo de cuadros pintado (render "transparente" falso) respetando fachadas blancas y jardín.
Uso: python3 scripts/quitar-fondo-cuadros.py entrada.png salida.png  (ajustar zona_pinos a cada imagen)
Usado para public/hero/edificio.webp (render de Hugo, 3-11-2026)."""
import sys
from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage
S=30
src=Image.open(sys.argv[1]).convert('RGB')
a=np.array(src).astype(int); H,W,_=a.shape
L=a.mean(2); mx=a.max(2); mn=a.min(2); neutral=(mx-mn)<=14
# fase de la cuadrícula
def ajuste(v):
    t=(v>230).astype(int); ch=np.flatnonzero(np.diff(t))+1
    d=np.diff(ch); ok=np.abs(d-S)<=3
    # tramo inicial continuo de cuadros
    end=len(d) if ok.all() else np.argmin(ok)
    pts=ch[:end+1]; k=np.round((pts-pts[0])/S)
    P,b=np.polyfit(k,pts,1); return P,b
Px,bx=ajuste(L[10,:]); Py,by=ajuste(L[:,10])
yy,xx=np.mgrid[0:H,0:W]
cell_x=np.floor((xx-bx)/Px).astype(int); cell_y=np.floor((yy-by)/Py).astype(int)
x0,y0=round(Px,3),round(Py,3)
par=(cell_x+cell_y)%2
# tono de la celda de la esquina
lightpar=par[10,10] if L[10,10]>230 else 1-par[10,10]
exp_light=(par==lightpar)
match=neutral & np.where(exp_light, mn>=228, (mn>=190)&(mn<=226))
# puntuación por celda
cx=cell_x-cell_x.min(); cy=cell_y-cell_y.min()
ncx,ncy=cx.max()+1,cy.max()+1
cid=cy*ncx+cx
cnt=np.bincount(cid.ravel(),minlength=ncx*ncy)
hit=np.bincount(cid.ravel(),weights=match.ravel(),minlength=ncx*ncy)
score=(hit/np.maximum(cnt,1)).reshape(ncy,ncx)
full=score>=0.9
cellpar=np.zeros((ncy,ncx),int)
cellpar[cy.ravel(),cx.ravel()]=exp_light.ravel()
lab,n=ndimage.label(full)
keep=np.zeros(n+1,bool)
for i in range(1,n+1):
    m=lab==i
    if m.sum()>=2 and cellpar[m].min()==0 and cellpar[m].max()==1: keep[i]=True
fullok=keep[lab]
# celdas de borde: vecinas de una celda buena
# crecer por celdas parcialmente de cuadros conectadas a las buenas (bolsas entre árboles)
some=(score>=0.04)|fullok
labs,_=ndimage.label(some,structure=np.ones((3,3)))
ok=np.unique(labs[fullok]); ok=ok[ok>0]
grown=np.isin(labs,ok)
near=ndimage.binary_dilation(grown,structure=np.ones((3,3)))
bg_cell_full=fullok[cy,cx]
near_strict=ndimage.binary_dilation(fullok,structure=np.ones((3,3)))
bg_strict=bg_cell_full|(near_strict[cy,cx]&match)
# bolsas entre ramas: solo donde hay follaje cerca (protege las fachadas blancas)
G=a[...,1]; folli=((G-a[...,0])>8)&((G-a[...,2])>8)&(L<200)
fol_near=ndimage.uniform_filter(folli.astype(float),size=151)>0.05
zona_pinos=((xx<700)|(xx>3150))&(yy<960)
bg_part=near[cy,cx] & match & (fol_near|zona_pinos)
bg=bg_strict|bg_part
# solo lo conectado a celdas buenas
# quitar motas sueltas de 1-2 px (no son cuadros)
bg=ndimage.binary_opening(bg,structure=np.ones((3,3)))|bg_cell_full
alpha=Image.fromarray(np.where(bg,0,255).astype(np.uint8))
alpha=alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.6))
out=src.copy(); out.putalpha(alpha)
# recortar 6 px de borde con artefactos
out=out.crop((6,6,W-6,H-6))
out.save(sys.argv[2])
blue=Image.new('RGBA',out.size,(20,60,140,255)); blue.alpha_composite(out); blue.convert('RGB').save(sys.argv[2].replace('.png','-azul.jpg'),quality=88)
print('phase',x0,y0,'bg',bg.mean())
