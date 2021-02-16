from cacheout import Cache
from api.config import CACHE_TIMEOUT

cache = Cache(maxsize=1000, ttl=CACHE_TIMEOUT)  # 5 minutes cache default
