import { useEffect, useState } from 'react'
import axios from 'axios';
import pkg from '../../package.json';
import { imageMetadata } from '../../types';


export function Home() {
  const [previews, setPreviews] = useState<imageMetadata[]>([]);
  const [error, setError] = useState('');
//   const [page, setPage] = useState('preview');
//   const [selected, setSelected] = useState('');


  useEffect(() => {
    (async () => {
      try {
        if (!navigator.onLine) return;
        const response = await axios.get(`${pkg.urls.api}/images?IsNsfw=false&many=true&pageSize=50&MaxByteSize=20971520`);
        const images = response.data?.items || [];
        if (images.length) throw new Error('No images found!');
        sessionStorage.setItem('preview_image_cache', JSON.stringify({ expires: Date.now() + (1000 * 60 * 30), images }));
        setPreviews(images);
      } catch (error: any) {
        console.error('Init error:', error);
        setError(error.message || 'Error while fetching images!');
      }
    })();
  }, [navigator.onLine]);
  return (
    <>
      {
        error ? <>{error}</>
          : 'preview' === 'preview' ?
            <div className="body">
              {previews.map(image => <img key={image.id} src={image.url} />)}
            </div>
            : <></>
      }
    </>
  )
}

