-- Insertar datos iniciales para las soluciones
INSERT INTO solutions (title, description, category, services, display_order, is_active) VALUES 
(
    'Gestión de Huella de Carbono',
    'Servicios especializados en medición, análisis y reducción de emisiones de gases de efecto invernadero.',
    'carbon_footprint',
    '[
        {
            "name": "Medición de Huella de Carbono Organizacional",
            "description": "Realizamos el inventario de GEI (gases de efecto invernadero) de acuerdo a la norma ISO 14064, asegurando el cumplimiento normativo (ej. Res. 258/2025 Neuquén, Res. 001/2025 Mendoza) y facilitando un reporte transparente."
        },
        {
            "name": "Análisis de Ciclo de Vida (ACV)",
            "description": "Identificamos los impactos ambientales a lo largo de la vida de un producto o servicio, siguiendo la norma ISO 14067 y las mejores prácticas de ACV para una visión completa."
        },
        {
            "name": "Estrategias de reducción de emisiones",
            "description": "Identificamos oportunidades de eficiencia energética, optimización de procesos y uso de energías limpias. Definimos metas de reducción y compensación estratégicas para la compañía."
        },
        {
            "name": "Capacitación y acompañamiento",
            "description": "Ofrecemos talleres y cursos sobre gestión de GEI y eficiencia energética para tus equipos, y te acompañamos en los procesos de verificación y certificación."
        }
    ]'::jsonb,
    1,
    true
),
(
    'Estudios y Auditorías Ambientales',
    'Evaluaciones completas y auditorías especializadas para garantizar el cumplimiento ambiental.',
    'environmental_studies',
    '[
        {
            "name": "Estudios de Impacto Ambiental (EIA)",
            "description": "Desarrollamos evaluaciones completas para proyectos como la instalación y reemplazo de ductos y nuevas instalaciones, garantizando el cumplimiento legal ambiental."
        },
        {
            "name": "Auditorías y Monitoreos Ambientales",
            "description": "Realizamos auditorías y monitoreos ambientales de acuerdo con la Disp. 123/06 y Res. 785/05 SEN, asegurando la adhesión a los estándares ambientales y legales."
        },
        {
            "name": "Estudios específicos",
            "description": "Llevamos a cabo estudios de agua y suelo, caracterizaciones ambientales y toma de muestras para Líneas de Base Ambiental y pedidos específicos."
        }
    ]'::jsonb,
    2,
    true
);

-- Crear usuario administrador por defecto (password: admin123)
INSERT INTO admin_users (name, email, password_hash, role) VALUES 
('Administrador', 'admin@aukanconsultores.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
