import subprocess

files = ['car', 'crickets:night', 'fan', 'forest', 'guitar', 'leaf', 'office', 'piano', 'rain', 'thunderstorm', 'train', 'white', 'wind']

for file in files: 
    print(file)
    wav = file + '.wav'
    cmd = 'lame --preset insane %s' % wav
    subprocess.call(cmd, shell=True)
