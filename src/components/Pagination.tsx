import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { blue50, gary100, gary500, gary800 } from "../styles/General"


export default function Pagination({
    ListLength = 20,
    singlePageItemCount = 5,

    currentPage = 1,
    onChange = () => console.log("page")

}: {
    ListLength: number,
    singlePageItemCount: number,
    onChange: (page: number) => void
    currentPage: number,


}) {

    const [pageNumber, setPageNumber] = useState<number>(1)

    useEffect(() => {
        onChange?.(pageNumber)
    }, [pageNumber])

    //如果在第二頁時 點其他HeaderTag 則會重新導回第一頁
    useEffect(() => {
        setPageNumber(currentPage)
    }, [currentPage])


    const maxPageCount = Math.ceil(ListLength / singlePageItemCount)

    let isLeftButtonDisable = pageNumber === 1
    let isRightButtonDisable = maxPageCount === pageNumber

    let pageArrRender: object[] = []
    for (let item = 1; item <= maxPageCount; item++) {
        pageArrRender.push(
            <WPaginationItem key={item} onClick={(e) => handlePageNumberClick(e)}>
                <WNumberItem active={item === pageNumber}>
                    {item}
                </WNumberItem>
            </WPaginationItem>
        )
    }

    const handlePageNumberClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const target = e.target as Element
        setPageNumber(Number(target.innerHTML))

    }

    const handleLeftClick = () => {
        setPageNumber(prevState => prevState - 1)

    }

    const handleRightClick = () => {
        setPageNumber(prevState => prevState + 1)
    }

    return <>
        <WPaginationList >
            <WPaginationItem>
                <WIconButton
                    onClick={() => handleLeftClick()}
                    cursor={isLeftButtonDisable}
                    disabled={isLeftButtonDisable}>
                    <WLeftIcon
                        icon={faChevronLeft}
                        size="sm" />
                </WIconButton>
            </WPaginationItem>
            {pageArrRender}
            <WPaginationItem>
                <WIconButton
                    onClick={() => handleRightClick()}
                    cursor={isRightButtonDisable}
                    disabled={isRightButtonDisable}>
                    <WRightIcon
                        icon={faChevronRight}
                        size="sm" />
                </WIconButton>
            </WPaginationItem>
        </WPaginationList>
    </>

}


const WItemHightStyled = css`
    color:${gary800};
    border:solid 1px ${gary500};
`
const WItemNoHightStyled = css`
    color:${gary100};
    border:solid 1px ${blue50};
`

const WItemOnClickStyled = css`
    padding: 0.375rem 0.625rem;
    cursor: pointer;
    line-height: 1;
    border:solid 1px ${blue50};
    color:${gary100};
    transition: all .3s;
    &:hover{
        ${WItemHightStyled}
    }
`

const WPaginationList = styled.ul`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 0.313rem 0.313rem;
    >li + li {
        margin-left:0.313rem;
    }
`

const WPaginationItem = styled.li`
    
`

const WNumberItem = styled.div<{ active?: boolean }>`
    ${WItemOnClickStyled};
    ${props => props.active ? WItemHightStyled : ""};
`

const WIconButton = styled.button<{ cursor?: boolean }>`
    ${WItemOnClickStyled};
    
    background-color: transparent;
    cursor: ${props => props.cursor ? " not-allowed" : "pointer"};
    padding: 0.5rem 0.688rem;
    &:focus{
        outline:none;
    }
    &:hover{
        ${props => props.cursor ? WItemNoHightStyled : WItemHightStyled};
    }
`

const WLeftIcon = styled(FontAwesomeIcon)`
    
    width:3.125rem;
`

const WRightIcon = styled(FontAwesomeIcon)`
    
    width:3.125rem;
`

