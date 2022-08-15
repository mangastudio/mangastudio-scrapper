import { uploadChapter } from '@mangastudio-scrapper/mangastudio-uploader';
import axios from 'axios';
import { URL } from 'node:url';
import * as cheerio from 'cheerio';
import * as list from './list.json';

async function getManga(url: string) {
  const html = await axios(url);
  const $ = cheerio.load(html.data);
  const chapters = $('.wp-manga-chapter a');
  const chapterUrls = chapters.map((i, el) => $(el).attr('href')).get();
  const chapterNames = chapters.map((i, el) => $(el).text()).get();
  const chapterDates = $('.chapter-release-date')
    .map((i, el) => $(el).text())
    .get();

  return chapterUrls.map((url, i) => ({
    url: new URL(url).href,
    name: chapterNames[i],
    date: chapterDates[i],
  }));
}

async function getChapter(url: string) {
  const html = await axios(url);
  const $ = cheerio.load(html.data);
  const pages = $('.reading-content img')
    .map((i, el) => new URL($(el).attr('data-src')).href)
    .get();
  return pages;
}

async function main() {
  console.log('Starting...');
  list.forEach(async (manga) => {
    const chapters = await getManga(manga.url);
    chapters.forEach(async (chapter) => {
      const pages = await getChapter(chapter.url);
      await uploadChapter(
        { id: manga.id },
        {
          name: chapter.name,
          date: chapter.date,
          images: pages,
        }
      );
    });
  });
}

main();
