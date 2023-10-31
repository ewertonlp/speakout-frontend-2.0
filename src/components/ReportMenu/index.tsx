import React from 'react'

function ReportMenu({
    page,
    setPage,
}: {
    page: 'relato' | 'historico' | 'usuarios' | 'conclusao' | 'acoes'
    setPage: React.Dispatch<React.SetStateAction<'relato' | 'historico' | 'usuarios' | 'conclusao' | 'acoes'>>
}) {
    return (
        <div
            style={{
                display: 'flex',
                borderBottom: '2px solid #CCC',
                marginBottom: '30px',
                flexWrap: 'wrap',
            }}
        >
            <p
                onClick={() => setPage('relato')}
                style={{
                    position: 'relative',
                    top: '2px',
                    borderBottom: page === 'relato' ? '2px solid #3366FF' : '',
                    color: page === 'relato' ? '#3366FF' : '#a7a7a7',
                    margin: 0,
                    marginRight: '10px',
                    cursor: 'pointer',
                    transition: 'color 0.5s',
                    marginTop: '5px',
                }}
            >
                Relato
            </p>
            <p
                onClick={() => setPage('historico')}
                style={{
                    position: 'relative',
                    top: '2px',
                    margin: 0,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    borderBottom: page === 'historico' ? '2px solid #3366FF' : '',
                    color: page === 'historico' ? '#3366FF' : '#a7a7a7',
                    transition: 'color 0.5s',
                    marginTop: '5px',
                }}
            >
                Chat com manifestante
            </p>
            <p
                onClick={() => setPage('usuarios')}
                style={{
                    position: 'relative',
                    top: '2px',
                    margin: 0,
                    marginLeft: '20px',
                    cursor: 'pointer',
                    borderBottom: page === 'usuarios' ? '2px solid #3366FF' : '',
                    color: page === 'usuarios' ? '#3366FF' : '#a7a7a7',
                    transition: 'color 0.5s',
                    marginTop: '5px',
                }}
            >
                Usuários
            </p>
            <p
                onClick={() => setPage('acoes')}
                style={{
                    position: 'relative',
                    top: '2px',
                    margin: 0,
                    marginLeft: '20px',
                    cursor: 'pointer',
                    borderBottom: page === 'acoes' ? '2px solid #3366FF' : '',
                    color: page === 'acoes' ? '#3366FF' : '#a7a7a7',
                    transition: 'color 0.5s',
                    marginTop: '5px',
                }}
            >
                Ações
            </p>
            <p
                onClick={() => setPage('conclusao')}
                style={{
                    position: 'relative',
                    top: '2px',
                    margin: 0,
                    marginLeft: '20px',
                    cursor: 'pointer',
                    borderBottom: page === 'conclusao' ? '2px solid #3366FF' : '',
                    color: page === 'conclusao' ? '#3366FF' : '#a7a7a7',
                    transition: 'color 0.5s',
                    marginTop: '5px',
                }}
            >
                Conclusão
            </p>
        </div>
    )
}

export default ReportMenu
