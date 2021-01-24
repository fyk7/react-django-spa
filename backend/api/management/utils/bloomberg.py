import re
import time
import requests
from logging import getLogger
from bs4 import BeautifulSoup
BLOOMBERG_URL = "https://www.bloomberg.co.jp/"
SLEEP_TIME = 0.5

logger = getLogger('django')


def prep_text(text):
    text = re.sub(r'原題.*(抜粋)', '', text)
    text = re.sub(r'Photographer:.*', '', text)
    text = re.sub(r'Source:.*', '', text)
    text = text.strip()
    return text


# TODO Add exception handling when css selectors no longer work.
def fetch_news():
    target_url = BLOOMBERG_URL
    try:
        res = requests.get(target_url)
        res.raise_for_status()
    except Exception as e:
        logger.error(e, stack_info=True, exc_info=True)
    time.sleep(SLEEP_TIME)

    soup = BeautifulSoup(res.text, 'html.parser')
    child_anchors = soup.select(
        "#hub_story_list_2 div article div div.story-list-story__info__headline a")

    news_list = []
    for a in child_anchors:
        news_dict = {}
        news_dict['publisher'] = 1
        news_dict['title'] = a.text
        child_url = target_url + a["href"]
        news_dict['detail_url'] = child_url
        try:
            res = requests.get(child_url)
            res.raise_for_status()
        except Exception as e:
            logger.error(e, stack_info=True, exc_info=True)
        time.sleep(SLEEP_TIME)
        soup = BeautifulSoup(res.text, 'html.parser')
        news_dict['detail'] = ''.join([prep_text(c.text) for c in soup.select(
            "article div.content-well section div.body-columns div p")])[:980] + '...'
        news_dict['article_timestamp'] = soup.select(
            "body > main > div.transporter-item.current > article > div.lede-text-only.lede > div > div > div > time")[0]["datetime"]
        news_list.append(news_dict)
    return news_list
