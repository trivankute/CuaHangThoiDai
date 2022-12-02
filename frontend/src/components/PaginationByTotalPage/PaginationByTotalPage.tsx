import {memo} from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationByTotalPage({totalPage}:{totalPage:any}) {
    return (
        <>
        <Pagination>
            {totalPage<=3?
            <>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Next />
            <Pagination.Last />
            </>
            :
            <>
            </>
        }
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item >{2}</Pagination.Item>
            <Pagination.Item >{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{6}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
        </>
    )
}

export default memo(PaginationByTotalPage)