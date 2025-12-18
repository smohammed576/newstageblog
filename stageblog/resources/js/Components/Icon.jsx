const Icon = ({classname}) => {
    return (
        <svg className={classname}>
            <use href="/images/sprite.svg" />
        </svg>
    );
}

export default Icon;