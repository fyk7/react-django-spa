import re
import time
import requests
from bs4 import BeautifulSoup
BLOOMBERG_URL = "https://www.bloomberg.co.jp/"


# class FinacialNews():
#     def __init__(self, base_url):
#         self.base_url = base_url


def prep_text(text):
    text = re.sub(r'原題.*(抜粋)', '', text)
    text = re.sub(r'Photographer:.*', '', text)
    text = re.sub(r'Source:.*', '', text)
    text = text.strip()
    return text


def fetch_news():
    target_url = BLOOMBERG_URL
    news_list = []
    res = requests.get(target_url)
    soup = BeautifulSoup(res.text, 'html.parser')

    for a in soup.select("#hub_story_list_2 div article div div.story-list-story__info__headline a"):
        news_dict = {}
        news_dict['publisher'] = 1
        news_dict['title'] = a.text
        child_url = target_url + a.get("href")
        news_dict['detail_url'] = child_url
        res = requests.get(child_url)
        time.sleep(0.5)
        soup = BeautifulSoup(res.text, 'html.parser')
        news_dict['detail'] = ''.join([prep_text(c.text) for c in soup.select(
            "article div.content-well section div.body-columns div p")])[:980] + '...'
        news_dict['article_timestamp'] = soup.select(
            "body > main > div.transporter-item.current > article > div.lede-text-only.lede > div > div > div > time")[0]["datetime"]
        news_list.append(news_dict)
    return news_list
