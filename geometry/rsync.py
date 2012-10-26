import os

cmd = 'rsync -avz --delete --exclude rsync.py . ~/Sites/algorithims/geometry'
print cmd
os.system(cmd)