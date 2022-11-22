import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './BackNavigate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
function BackNavigate({ backPath, backPage, currentPage }: { backPath: string, backPage:string, currentPage:string }) {
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState(false);
    return (
        <>
            <div
                onClick={() => { navigate(backPath) }}
                onMouseEnter={() => setIsShow(true)}
                onMouseLeave={() => setIsShow(false)}
                className={clsx(styles.box, "btn btn_custom")}>
                {
                    isShow ?
                        <div style={{ fontSize: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {backPage} <FontAwesomeIcon className={styles.icon} icon={faArrowLeft as IconProp} />
                        </div>
                        :
                        <div style={{ fontSize: 12, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {currentPage}
                        </div>
                }
            </div>
        </>
    )
}

export default memo(BackNavigate)