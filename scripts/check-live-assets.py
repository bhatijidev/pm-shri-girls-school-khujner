import urllib.request, ssl, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://pmshrigirlskhujner.in/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=5, context=ctx) as r:
    html = r.read().decode()
    for m in re.finditer(r'/assets/[a-zA-Z0-9_\-\.]+', html):
        print(m.group(0))
