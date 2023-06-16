# media_classifier.py
import requests
from bs4 import BeautifulSoup


class MediaClassifier:
    def __init__(self, url):
        self.url = url

    def get_media_type(self):
        response = requests.get(self.url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Youtube
        if 'youtube.com' in self.url or 'youtu.be' in self.url:
            return 'Youtube'

        # TikTok
        if 'tiktok.com' in self.url:
            return 'TikTok'

        # Instagram
        if 'instagram.com' in self.url:
            return 'Instagram'

        # Twitter
        if 'twitter.com' in self.url:
            return 'Twitter'

        # Facebook
        if 'facebook.com' in self.url:
            return 'Facebook'

        # LINE
        if 'line.me' in self.url:
            return 'LINE'

        # Wikipedia
        if 'wikipedia.org' in self.url:
            return 'Wikipedia'

        # Check for meta tags
        meta_tags = soup.find_all('meta')

        for tag in meta_tags:
            # Twitter Card
            if tag.get('name') == 'twitter:card':
                content = tag.get('content')
                if content == 'player':
                    return 'TV'
                elif content == 'summary_large_image':
                    return 'web雑誌'
                else:
                    return 'web'

            # Open Graph
            if tag.get('property') == 'og:type':
                content = tag.get('content')
                if content in ['video.movie', 'video.episode', 'video.tv_show']:
                    return 'TV'
                elif content == 'article':
                    return '新聞'
                elif content == 'website':
                    return 'web'

        # Find keywords in the text
        text = soup.get_text().lower()

        if 'ラジオ' in text or 'radio' in text:
            return 'ラジオ'
        if '雑誌' in text or 'magazine' in text:
            return '雑誌'
        if '新聞' in text or 'newspaper' in text:
            return '新聞'
        if 'tv' in text:
            return 'TV'

        return 'Unknown'