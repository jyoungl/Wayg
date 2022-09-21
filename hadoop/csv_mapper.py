#!/usr/bin/env python3
# -*-coding:utf-8 -*

import sys
import zipimport
importer = zipimport.zipimporter('lib.mod')
#konlpy = importer.load_module('konlpy.tag')

#okt = Okt()

for line in sys.stdin:
    line_list = line.split(',')
    key = line_list[0]
    text = line_list[1] + "\n" + line_list[3]
    print("%s\t%s" % (text, 1))
    # print("%s\t%s" % (line, 1))