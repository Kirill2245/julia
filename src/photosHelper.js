// helpers/photosHelper.js

/**
 * Получает список всех фото из публичного бакета
 * @param {string} bucketUrl - URL публичного бакета (например: https://storage.yandexcloud.net/jul/)
 * @param {string} prefix - Префикс для фильтрации файлов (опционально)
 * @returns {Promise<Array>} - Массив объектов с url и alt
 */
export const getAllPhotosFromBucket = async (bucketUrl, prefix = '') => {
  try {
    // Формируем URL для запроса списка файлов
    const listUrl = `${bucketUrl}?prefix=${prefix}&list-type=2`;
    
    const response = await fetch(listUrl);
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    
    // Парсим XML ответ от S3
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    
    // Проверяем на ошибки парсинга
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
      throw new Error('Ошибка парсинга XML');
    }

    // Получаем все элементы Contents
    const contents = xmlDoc.getElementsByTagName('Contents');
    
    if (contents.length === 0) {
      console.warn('В бакете нет файлов');
      return [];
    }

    const photos = [];
    let validPhotoCount = 0;

    for (let i = 0; i < contents.length; i++) {
      const key = contents[i].getElementsByTagName('Key')[0]?.textContent;
      const size = contents[i].getElementsByTagName('Size')[0]?.textContent;
      
      // Пропускаем папки (заканчиваются на /) и пустые файлы
      if (key && !key.endsWith('/') && parseInt(size) > 0) {
        // Проверяем, что это изображение по расширению
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(key);
        
        if (isImage) {
          photos.push({
            id: validPhotoCount,
            url: `${bucketUrl}${key}`,
            alt: `Наше фото ${validPhotoCount + 1}`,
            key: key,
            size: size,
          });
          validPhotoCount++;
        }
      }
    }

    console.log(`Загружено ${photos.length} фото из бакета`);
    return photos;
    
  } catch (error) {
    console.error('Ошибка получения фото из бакета:', error);
    return [];
  }
};

/**
 * Получить фото с пагинацией (если фото очень много)
 */
export const getAllPhotosWithPagination = async (bucketUrl, prefix = '', maxKeys = 100) => {
  try {
    let allPhotos = [];
    let isTruncated = true;
    let continuationToken = null;

    while (isTruncated) {
      let url = `${bucketUrl}?prefix=${prefix}&list-type=2&max-keys=${maxKeys}`;
      if (continuationToken) {
        url += `&continuation-token=${continuationToken}`;
      }

      const response = await fetch(url);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      const contents = xmlDoc.getElementsByTagName('Contents');
      
      for (let i = 0; i < contents.length; i++) {
        const key = contents[i].getElementsByTagName('Key')[0]?.textContent;
        const size = contents[i].getElementsByTagName('Size')[0]?.textContent;
        
        if (key && !key.endsWith('/') && parseInt(size) > 0) {
          const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(key);
          if (isImage) {
            allPhotos.push({
              id: allPhotos.length,
              url: `${bucketUrl}${key}`,
              alt: `Наше фото ${allPhotos.length + 1}`,
              key: key,
              size: size,
            });
          }
        }
      }

      // Проверяем, есть ли еще файлы
      const nextToken = xmlDoc.getElementsByTagName('NextContinuationToken')[0]?.textContent;
      isTruncated = xmlDoc.getElementsByTagName('IsTruncated')[0]?.textContent === 'true';
      continuationToken = nextToken || null;
    }

    console.log(`Загружено ${allPhotos.length} фото из бакета (с пагинацией)`);
    return allPhotos;
    
  } catch (error) {
    console.error('Ошибка получения фото с пагинацией:', error);
    return [];
  }
};

/**
 * Хелпер для работы с конкретным бакетом
 */
export const useJulBucket = () => {
  const BUCKET_URL = 'https://storage.yandexcloud.net/jul/';

  /**
   * Получить все фото из бакета
   */
  const getAllPhotos = async (prefix = '') => {
    return await getAllPhotosFromBucket(BUCKET_URL, prefix);
  };

  /**
   * Получить все фото с пагинацией
   */
  const getAllPhotosPaginated = async (prefix = '', maxKeys = 100) => {
    return await getAllPhotosWithPagination(BUCKET_URL, prefix, maxKeys);
  };

  return { 
    getAllPhotos, 
    getAllPhotosPaginated,
    BUCKET_URL 
  };
};

// Экспорт по умолчанию
export default getAllPhotosFromBucket;