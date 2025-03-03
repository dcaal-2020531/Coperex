import Company from "./company.model.js"
import { generateExcel } from '../../utils/generate.excel.js';



export const save = async (req, res) => {
    try {
        const data = req.body;
        const company = new Company(data);
        await company.save();
        return res.send({
            success: true,
            message: `${company.companyCategory} saved successfully`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error when adding company',
            err


        });
    }
};

export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const companies = await Company.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        if (companies.length === 0) return res.status(404).send({ message: 'Companies not found', success: false });
        return res.send({
            success: true,
            message: 'Companies found:',
            companies,
            total: companies.length
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const updates = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).send({ message: 'Company not found' });
        }

        const updatedCompany = await Company.findByIdAndUpdate(companyId, updates, { new: true });

        return res.send({ message: 'Company updated successfully', updatedCompany });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating company', err });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).send({ message: 'Company not found' });
        }

        await Company.findByIdAndDelete(companyId);

        return res.send({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting company', err });
    }
};


export const orderByCategory = async (req, res) => {
    try {
        const companies = await Company.find()
            .collation({ locale: "en", strength: 2 })
            .sort({ companyCategory: 1 }); 

        if (companies.length === 0) {
            return res.status(404).send({ success: false, message: 'Companies not found' });
        }

        return res.send({
            success: true,
            message: 'Companies sorted by category:',
            companies
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error sorting the list', err });
    }
}


export const orderByExperience = async (req, res) => {
    try {
        const companies = await Company.find()
            .sort({ trajectoryYears: 1 }); // Orden ascendente (menor a mayor)

        if (companies.length === 0) {
            return res.status(404).send({ success: false, message: 'Companies not found' });
        }

        return res.send({
            success: true,
            message: 'Companies sorted by experience (least to most):',
            companies
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error sorting the list', err });
    }
}

export const orderByNameAsc = async (req, res) => {
    try {
        const companies = await Company.find()
            .collation({ locale: "en", strength: 2 }) 
            .sort({ name: 1 }); // Orden ascendente (A-Z)

        if (companies.length === 0) {
            return res.status(404).send({ success: false, message: 'Companies not found' });
        }

        return res.send({
            success: true,
            message: 'Companies sorted by name (A-Z):',
            companies
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error sorting the list', err });
    }
}

export const orderByNameDesc = async (req, res) => {
    try {
        const companies = await Company.find()
            .collation({ locale: "en", strength: 2 }) 
            .sort({ name: -1 }); // Orden descendente (Z-A)

        if (companies.length === 0) {
            return res.status(404).send({ success: false, message: 'Companies not found' });
        }

        return res.send({
            success: true,
            message: 'Companies sorted by name (Z-A):',
            companies
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error sorting the list', err });
    }
}

export const exportExcel = async (req, res) => {
    try {
        const companies = await Company.find();

        if (companies.length === 0) {
            return res.status(404).send({ success: false, message: 'No hay empresas para exportar' });
        }

        const excelBuffer = await generateExcel(companies);

        res.setHeader('Content-Disposition', 'attachment; filename=companies.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Length', excelBuffer.length);

        res.send('Se genero el Documento excel');
    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: 'Error generando el archivo Excel', err });
    }
}
