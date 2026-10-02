"""Render original game share cards. Generated PNGs are checked in; not needed by the site build."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]/'JaneM_Website'
def font(size,serif=False):
    candidates=['/System/Library/Fonts/Supplemental/'+('Georgia.ttf' if serif else 'Arial.ttf'),'/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf' if serif else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']
    for f in candidates:
        if Path(f).exists():return ImageFont.truetype(f,size)
    return ImageFont.load_default()
P=['#7caeb5','#d2ac68','#c78392','#87ab8d','#d28f75','#909bbd','#ded1b6']
def tile(d,x,y,c,size=31):
    d.rounded_rectangle((x,y,x+size,y+size),5,fill=c)
    d.line((x+7,y+size-7,x+size-7,y+7),fill='#f4ead6',width=1)
def base(kicker,title,lines):
    im=Image.new('RGB',(1200,630),'#fbf8f3');d=ImageDraw.Draw(im)
    d.text((64,54),'JANE.M  /  PLAY',font=font(22),fill='#87622c')
    d.text((64,155),kicker,font=font(17),fill='#87622c')
    d.text((60,209),title,font=font(66,True),fill='#211d18')
    for i,line in enumerate(lines):d.text((64,325+i*40),line,font=font(23),fill='#766b5f')
    d.rounded_rectangle((64,493,369,551),29,fill='#b38a45');d.text((92,510),'FREE TO PLAY',font=font(20),fill='#17130e')
    d.text((64,581),'wearjanem.com',font=font(19),fill='#766b5f')
    d.rounded_rectangle((670,42,1148,588),24,fill='#18211e')
    return im,d
im,d=base('THE FALLING FABRIC PUZZLE','Pattern Drop',['Find the fit. Clear the rows.','Create a little collection.'])
for x in range(8):
    for y in range(12):d.rectangle((720+x*46,88+y*38,720+x*46+43,88+y*38+35),outline='#29372c')
for x,y,c in [(3,1,2),(2,2,2),(3,2,2),(4,2,2),(0,8,1),(1,8,1),(0,9,1),(1,9,1),(2,9,3),(3,9,3),(3,8,3),(4,8,3),(7,8,5),(5,9,5),(6,9,5),(7,9,5)]+[(x,y,(x+y)%7) for y in [10,11] for x in range(8)]:tile(d,720+x*46,88+y*38,P[c],34)
(ROOT/'pattern-drop').mkdir(exist_ok=True);im.save(ROOT/'pattern-drop/social-preview.png',optimize=True)
im,d=base('THE FASHION MAZE GAME','Atelier Dash',['Collect. Dodge. Deliver.','Three rounds. Three looks.'])
for x in range(735,1100,40):
    for y in range(100,550,40):d.ellipse((x-2,y-2,x+2,y+2),fill='#dfc894')
for pts in [[(695,75),(1122,75),(1122,555),(695,555),(695,75)],[(765,140),(835,140),(835,220),(760,220),(760,340)],[(920,75),(920,160),(1040,160),(1040,280)],[(845,295),(935,295),(935,410),(1055,410),(1055,520)],[(710,450),(835,450),(835,555)]]:d.line(pts,fill='#827250',width=8)
d.rounded_rectangle((828,330,858,378),5,fill='#b38a45');d.line((821,329,864,329),fill='#f0d39a',width=6);d.line((821,380,864,380),fill='#f0d39a',width=6)
for y in range(337,376,7):d.line((832,y,854,y-3),fill='#f0d39a',width=2)
for x,y in [(995,235),(750,390)]:
    d.ellipse((x-8,y-8,x+8,y+8),outline='#d89688',width=4);d.ellipse((x+10,y-8,x+26,y+8),outline='#d89688',width=4);d.line((x+5,y-5,x+23,y-32),fill='#d89688',width=4);d.line((x+15,y-5,x-5,y-32),fill='#d89688',width=4)
im.save(ROOT/'atelier-dash/social-preview.png',optimize=True)
im,d=base('FASHION, WITH A PLAYFUL SIDE','Jane.M Games',['Make a look. Chase a score.','Find your perfect fit.'])
for y,n,title,desc in [(112,'01','Style Spark','CREATE YOUR LOOK'),(265,'02','Atelier Dash','CHASE THE SUPPLIES'),(418,'03','Pattern Drop','FIT THE FABRIC')]:
    d.text((705,y),n,font=font(25),fill='#d2ac68');d.text((760,y-4),title,font=font(37,True),fill='#f6eee1');d.text((761,y+49),desc,font=font(16),fill='#ccbca2');d.line((705,y+106,1110,y+106),fill='#586047',width=1)
(ROOT/'games').mkdir(exist_ok=True);im.save(ROOT/'games/social-preview.png',optimize=True)
