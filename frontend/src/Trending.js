import { useContext } from 'react';
import { dataContext } from './ProductData';

const Trending = () => {
    const { productData } = useContext(dataContext);
    return productData.filter((cur) => cur.trending);
}

export default Trending
