import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function agendaPDF(agenda) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // formatar data
    const date = (data) => {
        const date = new Date(data);
        const dia = date.getDate().toString();
        const diaF = (dia.length === 1) ? `0${dia}` : dia;
        const mes = (date.getMonth() + 1).toString();
        const mesF = (mes.length === 1) ? `0${mes}` : mes;
        const anoF = date.getFullYear();
        return `${diaF}/${mesF}/${anoF}`;
    }

    const reportTitle = [
        {
            text: 'Pacientes agendados',
            fontSize: 15,
            bold: true,
            margin: [0, 45, 0, 45] // left, top, right, bottom
        }
    ];

    const dados = agenda.map((paciente) => {
        return [
            { text: date(paciente.agenda_data), fontSize: 10, margin: [5, 20, 5, 20] },
            { text: paciente.paciente_nome, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'left' },
            { text: paciente.paciente_cpf, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'center' },
            { text: paciente.paciente_telefone, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'center' },
            { text: paciente.agenda_saida, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'center' },
            { text: paciente.agenda_marcado, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'center' },
            { text: paciente.hospital_nome, fontSize: 10, margin: [5, 20, 5, 20], alignment: 'center' },
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
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [10, 30, 20, 10],

        styles: { tableHeader: { bold: true, fontSize: 12, color: 'black' } },
        header: [reportTitle],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitios).open();
}


export default agendaPDF;