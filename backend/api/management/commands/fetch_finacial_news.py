from django.conf import settings
from django.core.management.base import BaseCommand
from ...models import FinancialNews
from ..utils import bloomberg  # , reuters
ROEUTER_URL = "https://jp.reuters.com/"


class Command(BaseCommand):
    help = "Fetch financial news"

    def handle(self, *args, **options):
        bloomberg_news = bloomberg.fetch_news()
        # reuters_news = reuters.fetch_news()
        news = bloomberg_news  # + reuters_news
        for n in news:
            financial_news = FinancialNews(publisher=n['publisher'], title=n['title'], detail=n['detail'],
                                           detail_url=n['detail_url'], article_timestamp=n['article_timestamp'])
            financial_news.save()
