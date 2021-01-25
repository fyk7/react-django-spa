from datetime import datetime, timedelta
from logging import getLogger
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from api.models import FinancialNews
from api.serializers import NewsSerializer
from api.management.utils import bloomberg  # , reuters

logger = getLogger('django')


class Command(BaseCommand):
    help = "Update financial news"

    def handle(self, *args, **options):
        recent_fetched_news = FinancialNews.objects.filter(
            article_timestamp__gte=datetime.today() - timedelta(days=7))
        bloomberg_news = bloomberg.fetch_news()
        # TODO Support for reuters news
        # reuters_news = reuters.fetch_news()
        multiple_news = bloomberg_news  # + reuters_news
        # TODO Investigating Serializer's "many=True" option can be used before iteration.
        for news in multiple_news:
            serializer = NewsSerializer(data=news)
            if serializer.is_valid(raise_exception=True):
                if serializer.validated_data['title'] not in [news.title for news in recent_fetched_news]:
                    try:
                        serializer.save()
                    except IntegrityError as e:
                        logger.warning(
                            f"Already fetched article is in database: {serializer.validated_data['title']}")
                        logger.warning(e, stack_info=True, exc_info=True)
                    except Exception as e:
                        logger.error(e, stack_info=True, exc_info=True)

                else:
                    logger.info(
                        f"Skipped (already fetched): {serializer.validated_data['title']}")
