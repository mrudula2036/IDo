from urllib.request import urlopen
s=urlopen('https://edchemy.kumarans.org/')
with open ('index.html','w',encoding='utf-8') as f1:
    for i in s:
        f1.write(i.decode())
        f1.write('\n')