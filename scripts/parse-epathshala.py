import urllib.request
import re

req = urllib.request.Request('https://epathshala.ncert.gov.in/test.html', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=5) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        entries = re.findall(r'\["[^"]+","([^"]+)","([^"]+)"\]', content)
        print('Total book entries in ePathshala test.html:', len(entries))
        for name, code in entries[:20]:
            print(f'{code:10} -> {name}')
except Exception as e:
    print('Error:', e)
