# Nexa Software: website ka access aur updates

Live website: https://nexa-software-downloads.pages.dev/

Cloudflare project: `nexa-software-downloads`

GitHub ke liye repository name: `nexa-software-website`

## GitHub par pehli baar files rakhna

1. Apne `ibrahimhashimaa007-bit` GitHub account mein New repository kholein.
2. Name `nexa-software-website` aur visibility Public rakhein. Description optional hai. Add README enable kar sakte hain; package ka README upload karne par woh replace hoga. License khud select kiye baghair koi license add na karein.
3. Repository banane ke baad Add file > Upload files kholein.
4. Is extracted folder ke ANDAR ki files aur folders ek saath drag/drop karein. README.md aur dist/ repository ke root par hone chahiye. Sirf ZIP upload karne se GitHub uske andar ki files khud extract nahi karta.
5. Commit changes karein. Repository root par README.md ka preview aur dist/ folder dikhna chahiye.
6. About ke gear se Website field mein live website URL add karein. Suggested topics: nexatik, windows, video-downloader, batch-download, nexasoftware.

Is package mein desktop application ka implementation source ya Windows installer shamil nahi. Existing installer apni GitHub Release par hi hai; README aur website usi ko link karte hain.

## Website update karna

1. Text ya product content `build.py` mein edit karein. Phir Python 3 se `python build.py` chalayein. Build ki default URL live Cloudflare address hai.
2. CSS ko `dist/assets/style.css` aur JavaScript ko `dist/assets/app.js` mein edit karein. Build in dono ko preserve karta hai.
3. Seedha `dist/` ka HTML edit karna bhi mumkin hai, lekin baad mein build.py chalane par woh generated HTML overwrite hoga. Mustaqil text changes build.py mein rakhein.
4. `Prepare-Website.ps1` run karke prompt mein `https://nexa-software-downloads.pages.dev` dein. Yeh root-correct upload ZIP banata hai.
5. Cloudflare > Workers & Pages > nexa-software-downloads > Create deployment > Production mein generated Nexa-Software-Pages-Upload.zip upload karein.
6. Live homepage aur affected pages check karein. GitHub par changed source aur dist files bhi commit karein, taake dono copies same rahen.

GitHub update khud se maujooda Direct Upload Cloudflare project ko update nahi karti. Native Git integration ke liye alag project ya baad mein authenticated deployment workflow setup chahiye; is package mein woh configured nahi.

## Google aur AdSense

`verification/googlea69c999eea28f218.html` aur dist ki verification file preserve rakhein. Verification file public honi chahiye; yeh password nahi hai.

Search Console ownership user ne complete report ki hai. Sitemap XML live hai, magar Search Console ka Couldn't fetch issue abhi unresolved hai. Homepage live test ka user screenshot Page can be indexed dikhata hai; actual indexing confirmed nahi. Daily request quota exhausted tha.

AdSense abhi configured nahi. AdSense ka diya hua verified code ya ads.txt milne par website mein add karke nayi Cloudflare deployment karni hogi.

GitHub account passwords, tokens, session cookies aur private account files repository mein upload na karein.
