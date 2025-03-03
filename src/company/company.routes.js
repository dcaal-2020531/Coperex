import { Router } from 'express';
import { getAll, save, updateCompany, deleteCompany, orderByCategory, exportExcel, orderByExperience, orderByNameAsc, orderByNameDesc } from './company.controller.js';
import { test } from '../auth/auth.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/', [validateJwt], getAll);
api.post('/', [validateJwt], save);
api.put('/:companyId', [validateJwt], updateCompany);
api.delete('/:companyId', [validateJwt], deleteCompany);
api.get('/test', test);
api.get('/orderByCategory',orderByCategory)
api.get('/orderByExperience',orderByExperience)
api.get('/orderByNameAsc',orderByNameAsc)
api.get('/orderByNameDesc', orderByNameDesc); 
api.get('/exportExcel',exportExcel)

export default api;
