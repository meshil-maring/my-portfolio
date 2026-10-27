import httpx, os
from dotenv import load_dotenv
load_dotenv()
key=os.getenv('EMBEDDING_API_KEY')
r=httpx.post(
    'https://api.jina.ai/v1/embeddings',
    headers={
        'Authorization':'Bearer '+key,
        'Content-Type':'application/json',
        'Accept':'application/json',
    },
    json={
        'model':'jina-embeddings-v5-text-nano',
        'task':'retrieval.passage',
        'normalized':True,
        'input':['hello'],
    },
    timeout=30,
)
print(r.status_code)
print(r.text[:500])

