import ExcelJS from 'exceljs';

export const generateExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Companies');

    // Definir columnas
    worksheet.columns = [
        { header: 'Nombre', key: 'name', width: 25 },
        { header: 'Categoría', key: 'companyCategory', width: 25 },
        { header: 'Años de trayectoria', key: 'trajectoryYears', width: 20 },
        { header: 'Nivel de impacto', key: 'impactLevel', width: 20 }
    ]

    // Aplicar estilos al encabezado
    const headerStyles = {
        alignment: { horizontal: 'center', vertical: 'middle' },
        font:    { bold: true, size: 12, color: { argb: 'FFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '0073e6' } },
        border: { bottom: { style: 'thin', color: { argb: '000000' } } }
    }

    worksheet.getRow(1).eachCell((cell) => Object.assign(cell, headerStyles));

    // Agregar datos
    data.forEach(company => {
        worksheet.addRow(company);
    })

    // Generar el archivo en un buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}