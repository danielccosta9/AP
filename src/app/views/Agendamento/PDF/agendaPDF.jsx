import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function agendaPDF(agenda) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dados = agenda.map((paciente) => {
        return [
            // left, top, right, bottom
            {
                // data + 1 dia
                text: new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                }).format(new Date(paciente.agenda_data).getTime() + 24 * 60 * 60 * 1000), fontSize: 11, margin: [0, 17, 0, 17]
            },
            { text: paciente.paciente_nome, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'left' },
            { text: paciente.paciente_cpf, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'center' },
            { text: paciente.paciente_telefone, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'center' },
            { text: paciente.agenda_saida, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'center' },
            { text: paciente.agenda_marcado, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'center' },
            { text: paciente.hospital_nome, fontSize: 11, margin: [0, 17, 0, 17], alignment: 'center' },
            { text: '' },
        ]
    });

    const details = [
        {
            table: {
                headerRows: 1,
                widths: [65, 100, 80, 90, 50, 50, 150, '*'],
                body: [
                    [
                        { text: 'Data' },
                        { text: 'Nome' },
                        { text: 'CPF', alignment: 'center' },
                        { text: 'Telefone', alignment: 'center' },
                        { text: 'Saída', alignment: 'center' },
                        { text: 'Marcado', alignment: 'center' },
                        { text: 'Hospital', alignment: 'center' },
                        { text: 'Assinatura', alignment: 'center' },
                    ],
                    ...dados
                ]
            },
            hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
        }
    ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [1, 30, 1, 10] // left, top, right, bottom
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [1, 30, 1, 10],

        styles: { tableHeader: { bold: true, fontSize: 12, color: 'black' } },
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).open();
}


export default agendaPDF;