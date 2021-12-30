import React from 'react'

function DetailPage({match} :any) {
    return (
        <div>
            Детальная страница
            {match.params.id}
        </div>
    )
}
export default DetailPage
