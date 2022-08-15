interface Manga {
  id: number;
}

interface Chapter {
  name: string;
  date: string;
  images: string[];
}

async function uploadChapter(manga: Manga, chapter: Chapter) {
  // await axios.post('https://mangastudio.app/api/chapters', {
  //   mangaId: manga.id,
  //   name: chapter.name,
  //   date: chapter.date,
  //   images: chapter.images,
  // });
}

export { uploadChapter, Manga, Chapter };
