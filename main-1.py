from time  import sleep
from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.error import HTTPError
import os
class city:
    def __init__(self,file_name='home.html') -> None:
        self.html=file_name
        with open(self.html,'r',encoding= 'utf-8') as self.file:
            soup=BeautifulSoup(self.file,features='html.parser')
            self.all_srctagname=['a','link','area','base']
            self.all_hreftagname=['img','script','iframe','audio','embed','input','source','track','video']
            self.all_tags=self.all_srctagname+self.all_hreftagname
            self.a=soup.find_all('a')
            self.link=soup.find_all('link')
            self.area=soup.find_all('area')
            self.base=soup.find_all('base ')
            self.href_tags=self.a+self.link+self.area+self.base
            self.img=soup.find_all('img')
            self.script=soup.find_all('script')
            self.iframe=soup.find_all('iframe')
            self.audio=soup.find_all('audio')
            self.embed=soup.find_all('embed')
            self.input=soup.find_all('input')
            self.source=soup.find_all('source')
            self.track=soup.find_all('track')
            self.video=soup.find_all('video')
            self.src_tags=self.img+self.script+self.iframe+self.audio+self.embed+self.input+self.source+self.track+self.video
            self.all_hrefs=[]
            self.all_srcs=[]
            for i in self.href_tags:
                temp=i.get('href')
                if temp!=None:
                    self.all_hrefs.append(temp)
            for i in self.src_tags:
                temp=i.get('src')
                if temp!=None:
                    self.all_srcs.append(temp)
            self.filtered_resource=[]
            self.filter()
            self.webpaths=[]
            self.filepath=[]
    def all_href_tags(self):
        all=self.a+self.link+self.area+self.base
        return all
    def all_src_tags(self):
        all=self.img+self.script+self.iframe+self.audio+self.embed+self.input+self.source+self.track+self.video
        return all
    def href(self,tag):
        temp=[]
        if tag in ['a','link','area','base']:
            if tag=='a':
                for i in self.a:
                    temp.append(i.get('href'))
                return temp
            elif tag=='link':
                for i in self.link:
                    temp.append(i.get('href'))
                return temp
            elif tag=='area':
                for i in self.area:
                    temp.append(i.get('href'))
                return temp
            else:
                for i in self.base:
                    temp.append(i.get('href'))
                return temp
        return temp
    def src(self,tag):
        temp=[]
        if tag in ['img','script','iframe','audio','embed','input','source','track','video']:
            if tag=='img':
                for i in self.img:
                    temp.append(i.get('src'))
                return temp
            elif tag=='script':
                for i in self.script:
                    temp.append(i.get('src'))
                return temp
            elif tag=='iframe':
                for i in self.iframe:
                    temp.append(i.get('src'))
                return temp
            elif tag=='audio':
                for i in self.audio:
                    temp.append(i.get('src'))
                return temp
            elif tag=='embed':
                for i in self.embed:
                    temp.append(i.get('src'))
                return temp
            
            elif tag=='input':
                for i in self.input:
                    temp.append(i.get('src'))
                return temp
            elif tag=='source':
                for i in self.source:
                    temp.append(i.get('src'))
                return temp
            elif tag=='track':
                for i in self.track:
                    temp.append(i.get('src'))
                return temp
            elif tag=='video':
                for i in self.video:
                    temp.append(i.get('src'))
        return temp
    def give_all_hrefs(self):
        return self.all_hrefs
    def give_all_srcs(self):
        return self.all_srcs
    def give_all_srcs_and_hrefs(self):
        return self.all_hrefs+self.all_srcs
    def filter(self):
        for i in self.all_hrefs+self.all_srcs:
            temp=i
            i=i.lower()
            if i.endswith('.html') or i.endswith('.css') or i.endswith('.js') or i.endswith('.gif'):
                self.filtered_resource.append(temp)
            elif i.endswith('.png') or i.endswith('.jpg') or i.endswith('.jpeg') or i.endswith('.ico'):
                self.filtered_resource.append(temp)
            elif i.endswith('.svg') or i.endswith('.mp3') or i.endswith('.pdf') or i.endswith('.exe'):
                self.filtered_resource.append(temp)
            elif i.endswith('.docx'):
                self.filtered_resource.append(temp)
    def print_filtered_resource(self):
        count=0
        for i in obj.filtered_resource:
            print(count,' ',i)
            sleep(0.5)
            count+=1
    def makingdir(self,file,web):
        verify=web.find('/')
        if verify==-1:
            if os.path.isfile(file):
                return
            else:
                self.writing(web,file)
        else:
            if os.path.isfile(file):
                return
            else:
                temp=file.split('\\')
                del temp[-1]
                temp='\\'.join(temp)
                if os.path.isdir(temp):
                    self.writing(web,file)
                else:
                    try:
                        os.makedirs(temp)
                    except:
                        print(temp)
                        # print('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
                    self.writing(web,file)


    def filtered_paths(self):
        for i in self.filtered_resource:
            temp=i
            verify=temp.find("/")  
            if verify!=-1:
                nav=temp.split('/')
                temp=[]
                for i in nav:
                    if i!='':
                        temp.append(i.strip())
                nav='/'.join(temp)
                file='\\'.join(temp)
                file=file.replace('%20',' ')
                web=nav.replace(' ','%20')
            else:
                file=temp.strip()
                web=temp.strip().replace(' ','%20')
            
            self.makingdir(file,web)
            
    def writing(self,data,extend):
        url="http://www.cityengineeringcollege.ac.in/"+data
        print(url)
        try:
            
            web=urlopen(url)
            mode=''
            if extend.endswith('.html')or extend.endswith('.css')or extend.endswith('.js'):
                    mode='w'
                    print("FILE: ",extend)
                    with open(extend,mode) as file:
                            for i in web:
                                try:
                                    file.write(i.decode().rstrip())
                                    file.write('\n')
                                except UnicodeEncodeError as e:
                                    print(e)
                            
                    return
            else:
                    mode='wb'
                    with open(extend,mode) as file:
                        for i in web:
                            file.write(i)
                        
                    return
        except HTTPError as e:
            with open('sri_vinay.txt','w') as file:
                file.write(url+'\n')
        
listhtml=os.listdir('./')  
c=1
for i in listhtml:
    if i.endswith(".html"):
        obj=city(file_name=i)
        obj.filtered_paths()
        print(str(c)+'__________________________________________________________________________________',i)
        c+=1       