import { Request, Response } from 'express';
import { OrganizationService } from '../services/organization.service';
import { registerOrganizationSchema, updateStatusSchema, addDomainSchema, updateSettingsSchema } from '../dto/organization.dto';
import { PostService } from '../../post/services/post.service';

export class OrganizationController {
  static async register(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const data = registerOrganizationSchema.parse(req.body);
      const organization = await OrganizationService.register(userId, data);
      res.status(201).json({ status: 'success', data: organization });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateStatusSchema.parse(req.body);
      const organization = await OrganizationService.updateStatus(id as string, data);
      res.status(200).json({ status: 'success', data: organization });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  static async addDomain(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = addDomainSchema.parse(req.body);
      const domain = await OrganizationService.addDomain(id as string, data);
      res.status(201).json({ status: 'success', data: domain });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const organization = await OrganizationService.getById(id as string);
      res.status(200).json({ status: 'success', data: organization });
    } catch (error: any) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  static async updateSettings(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateSettingsSchema.parse(req.body);
      const organization = await OrganizationService.updateSettings(id as string, data);
      res.status(200).json({ status: 'success', data: organization });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ status: 'error', message: 'Validation failed', errors: error.errors });
        return;
      }
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  static async deleteOrganizationPost(req: Request, res: Response) {
    try {
      const { id, postId } = req.params;
      
      await PostService.deleteOrganizationPost(id as string, postId as string);
      
      res.status(200).json({ status: 'success', message: 'Post deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
}
