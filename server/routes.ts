import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertContactSchema, insertSettingSchema } from "@shared/schema";
import fs from "fs/promises";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid lead data" });
    }
  });

  // Contact form endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid contact data" });
    }
  });

  // Get leads (for admin purposes)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Get contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Configurações do sistema
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key || !value) {
        return res.status(400).json({ error: "Key and value are required" });
      }
      const setting = await storage.setSetting(key, value);
      res.json({ success: true, setting });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid setting data" });
    }
  });

  // Endpoint específico para WhatsApp
  app.get("/api/whatsapp-config", async (req, res) => {
    try {
      // Primeiro tenta buscar da configuração do banco
      let whatsappNumber = null;
      const setting = await storage.getSetting("whatsapp_number");
      
      if (setting) {
        whatsappNumber = setting.value;
      } else {
        // Se não encontrar no banco, tenta buscar do arquivo de configuração da instalação
        try {
          const configFile = await fs.readFile('ligai-config.json', 'utf-8');
          const config = JSON.parse(configFile);
          if (config.whatsappNumber) {
            // Salva no banco para próximas consultas
            await storage.setSetting("whatsapp_number", config.whatsappNumber);
            whatsappNumber = config.whatsappNumber;
          }
        } catch {
          // Arquivo não existe ou erro de leitura
        }
      }

      if (!whatsappNumber) {
        return res.status(404).json({ error: "WhatsApp not configured" });
      }

      res.json({ 
        whatsappNumber,
        whatsappUrl: `https://wa.me/${whatsappNumber}?text=Olá! Tenho interesse no sistema LigAI - Vendas. Gostaria de saber mais sobre vendas automatizadas.`
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get WhatsApp config" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
