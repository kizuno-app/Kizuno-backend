import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

export class ReportController {
  static async submitReport(req: Request, res: Response) {
    try {
      const reporterId = req.user!.userId;
      const { targetType, targetId, category, reason } = req.body;

      if (!targetType || !targetId || !category) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
      }

      const report = await ReportService.submitReport(reporterId, { targetType, targetId, category, reason });
      res.status(201).json({ status: 'success', data: report });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  static async getModerationCases(req: Request, res: Response) {
    try {
      const cases = await ReportService.getModerationCases();
      res.status(200).json({ status: 'success', data: cases });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async actionCase(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { action } = req.body; // WARN, SUSPEND, DELETE, DISMISS

      if (!['WARN', 'SUSPEND', 'DELETE', 'DISMISS'].includes(action)) {
        return res.status(400).json({ status: 'error', message: 'Invalid action' });
      }

      const updated = await ReportService.actionModerationCase(id, action);
      res.status(200).json({ status: 'success', data: updated });
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }
}
