const Pagination = ({data}) => {
    return (
        <span className="pagination">
            <a href={data.prev_page_url} className={`pagination__link ${data.prev_page_url == null && 'pagination__link--disabled'}`}>Newer</a>
            <span className="pagination__wrapper">
                {
                    data.links.map((item, index) => 
                        index != 0 && index != data.links.length - 1 &&
                        <a key={index} href={item.url} className={`pagination__number ${item.active && 'pagination__number--active'}`}>{item.label}</a>
                    )
                }
            </span>
            <a href={data.next_page_url} className={`pagination__link ${data.next_page_url == null && 'pagination__link--disabled'}`}>Older</a>
        </span>
    );
}

export default Pagination;