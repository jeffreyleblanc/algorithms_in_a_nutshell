#!/usr/bin/python

import os

cmd = 'rsync -avz --delete --exclude rsync.py . ~/Sites/algorithims/networkflow'
print cmd
os.system(cmd)