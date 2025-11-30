const Markdown = {
    a: ({node, ...props}) => (
        <a {...props} target="_blank"></a>
    ),
    img: ({node, alt, ...props}) => (<figure>
        <img {...props} alt={alt}/>
        {
            alt && <p className="markdown__caption">{alt}</p>
        }
    </figure>
    )
}

const PostMarkdown = {
    a: ({node, ...props}) => (
        <a {...props} target="_blank" className="post__markdown--link"></a>
    ),
    img: ({node, alt, ...props}) => (
    <figure className="post__markdown--figure">
        <img className="post__markdown--figure-image" {...props} alt={alt}/>
        {
            alt && <i className="post__markdown--figure-caption">{alt}</i>
        }
    </figure>
    ),
    p: ({node, ...props}) => (
        <p {...props} className="post__markdown--text"></p>
    ),
    h2: ({node, ...props}) => (
        <h2 {...props} className="post__markdown--subtitle"></h2>
    ),
    ol: ({node, ...props}) => (
        <ol {...props} className="post__markdown--list"></ol>
    ),
    li: ({node, ...props}) => (
        <li {...props} className="post__markdown--list-item"></li>
    ),
    ul: ({node, ...props}) => (
        <ul {...props} className="post__markdown--item"></ul>
    )
}

const ImageMarkdown = {
    img: ({node, alt, ...props}) => (
        <>
            <img {...props} alt={alt} className="post__image" />
            {
                alt && <i className="post__caption">{alt}</i>
            }
        </>
    )
}

export default Markdown;
export {PostMarkdown};
export {ImageMarkdown};