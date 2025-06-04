"use strict";

class Utils {
    static formatCurrency(amount) {
        const numAmount = Number(amount);
        return `S/${isNaN(numAmount) ? '0.00' : numAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    static getStarRatingHTML(rating = 0, maxStars = 5) {
        const RATING = parseFloat(rating);
        if (isNaN(RATING) || RATING === 0) return '<span class="rating-text">Sin calificación</span>';
        let html = '';
        const fullStars = Math.floor(RATING);
        const halfStar = RATING % 1 >= 0.4;
        const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
        html += '<i class="fas fa-star"></i>'.repeat(fullStars);
        if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
        html += '<i class="far fa-star"></i>'.repeat(emptyStars);
        return html;
    }

    static debounce(func, delay = 350) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
}

class ApiService {
    constructor() {
        this.db = {
            products: [
               // PARLANTES (9 productos)
                { id: "acc001", name: "PARLANTE MICRONICS RHAPSODY", category: ["audio", "accesorios"], price: 129.90, images: ["imagenes/parlantemicro.jpg"], rating: 4.3, description: "Parlante 2.1 con iluminación LED RGB, tipo gamer, ofrece un sonido estéreo envolvente.", specs: ["Sistema: 2.1", "Iluminación: LED RGB", "Conexión: USB, 3.5mm"], stock: 50, slider: "accesorios" },
                { id: "acc002", name: "PARLANTE MICRONICS CORSAIR", category: ["audio", "accesorios"], price: 31.88, oldPrice: 39.90, images: ["imagenes/parlantecor.jpg"], rating: 4.7, description: "Parlante 2.0 con iluminación LED RGB, compatible con múltiples dispositivos.", specs: ["Sistema: 2.0", "Iluminación: LED RGB", "Conexión: USB, 3.5mm"], stock: 50, slider: "ofertas" },
                { id: "acc003", name: "PARLANTE MICRONICS MIRAGE", category: ["audio", "accesorios"], price: 89.90, images: ["imagenes/parlantemirage.jpg"], rating: 4.0, description: "Parlante 2.0 con iluminación LED RGB, ideal para PC y laptop.", specs: ["Sistema: 2.0", "Iluminación: LED RGB", "Conexión: USB, 3.5mm"], stock: 50, slider: "accesorios" },
                { id: "acc004", name: "PARLANTE MICRONICS LUXOR", category: ["audio", "accesorios"], price: 59.84, oldPrice: 69.90, images: ["imagenes/parlanteluxor.webp"], rating: 4.3, description: "Parlante 2.0 USB con iluminación RGB Flaming, control de volumen en cable.", specs: ["Bocinas: 2.5\" x 2", "Iluminación: LED RGB Flaming", "Conexión: Jack 3.5mm, USB"], stock: 50, slider: "ofertas" },
                { id: "acc005", name: "PARLANTE CYBERTEL ROCKER", category: ["audio", "accesorios"], price: 34.99, images: ["imagenes/parlanterocker.jpg"], rating: 4.0, description: "Parlante para PC con potencia de 6 RMS, 2 parlantes.", specs: ["Potencia: 6 RMS", "Número de parlantes: 2", "Conexión: No especificada"], stock: 50, slider: "accesorios" },
                { id: "acc070", name: "PARLANTE HALION HA-S25", category: ["audio", "accesorios"], price: 49.90, images: ["imagenes/parlantehas-25.jpg"], rating: 4.2, description: "Parlante portátil con Bluetooth 5.0 y batería de larga duración.", specs: ["Potencia: 10W", "Batería: 8 horas", "Conexión: Bluetooth 5.0, AUX"], stock: 50, slider: "accesorios" },
                { id: "acc071", name: "PARLANTE HALION ROCKER HA-K30", category: ["audio", "accesorios"], price: 79.90, images: ["imagenes/parlantek-30.jpg"], rating: 4.5, description: "Parlante gaming con iluminación RGB y graves potentes.", specs: ["Potencia: 20W RMS", "Iluminación: RGB personalizable", "Entrada: USB, 3.5mm"], stock: 50, slider: "accesorios" },
                { id: "acc072", name: "PARLANTE HALION DRACO HA-K38", category: ["audio", "accesorios"], price: 99.90, images: ["imagenes/parlantek-38h.webp"], rating: 4.6, description: "Parlante 2.1 con subwoofer y control remoto inalámbrico.", specs: ["Sistema: 2.1", "Subwoofer: 5.25\"", "Control remoto incluido"], stock: 50, slider: "accesorios" },
                
                // MANDOS (3 productos)
                { id: "acc006", name: "MANDO ENKORE ADDICT", category: ["gamer", "accesorios"], price: 50.00, images: ["imagenes/mandoenkore.jpg"], rating: 4.5, description: "Mando inalámbrico con diseño ergonómico y botones programables.", specs: ["Conexión: Inalámbrico 2.4G", "Botones: 12", "Compatibilidad: PC, PS4, Xbox"], stock: 50, slider: "accesorios" },
                { id: "acc007", name: "MANDO ENKORE LUDICO", category: ["gamer", "accesorios"], price: 54.00, images: ["imagenes/mandolucido.webp"], rating: 4.3, description: "Mando gaming con vibración y gatillos sensibles.", specs: ["Conexión: Bluetooth/USB", "Botones: 14", "Motores de vibración: 2"], stock: 50, slider: "accesorios" },
                { id: "acc008", name: "MANDO CYBERTEL STRICKER", category: ["gamer", "accesorios"], price: 45.90, images: ["imagenes/mandostri.jpg"], rating: 4.2, description: "Mando con cable USB, diseño ergonómico, 13 botones y 2 motores de vibración.", specs: ["Botones: 13", "Motores de vibración: 2", "Conexión: USB (1.5m)"], stock: 50, slider: "accesorios" },
                
                // TECLADOS (25 productos)
                { id: "acc009", name: "TECLADO GAMER BYBERTEL SPLENDID", category: ["perifericos", "gamer"], price: 149.90, images: ["imagenes/tecladosplend.webp"], rating: 4.4, description: "Teclado mecánico gaming con retroiluminación RGB personalizable.", specs: ["Switch: Red", "Iluminación: RGB 16.8M colores", "Anti-ghosting: 100%"], stock: 50, slider: "accesorios" },
                { id: "acc010", name: "TECLADO ENKORE BRIAN ENK603 NEGRO", category: ["perifericos", "accesorios"], price: 54.99, oldPrice: 65.99, images: ["imagenes/tecladoenkore.jpg"], rating: 4.0, description: "Teclado gamer con diseño resistente y teclas de rápido desplazamiento.", specs: ["Conectividad: USB", "Iluminación: No", "Garantía: 3 meses"], stock: 50, slider: "ofertas" },
                { id: "acc011", name: "TECLADO ENKORE BRIAN ENK603 BLANCO", category: ["perifericos", "accesorios"], price: 54.99, oldPrice: 65.99, images: ["imagenes/tecladoenkoreblan.webp"], rating: 4.1, description: "Teclado gamer en color blanco con teclas silenciosas.", specs: ["Conectividad: USB", "Iluminación: No", "Garantía: 3 meses"], stock: 50, slider: "ofertas" },
                { id: "acc012", name: "TECLADO GAMER MICRONICS FISHER", category: ["perifericos", "gamer"], price: 89.90, images: ["imagenes/tecladomicrofisher.webp"], rating: 4.3, description: "Teclado semi-mecánico con retroiluminación RGB y diseño ergonómico.", specs: ["Tipo: Semi-mecánico", "Iluminación: RGB", "Teclas: 104"], stock: 50, slider: "accesorios" },
                { id: "acc013", name: "TECLADO GAMER MICRONICS AVANTY", category: ["perifericos", "gamer"], price: 109.90, images: ["imagenes/tecladoavanty.webp"], rating: 4.5, description: "Teclado mecánico con switches Outemu Blue y retroiluminación azul.", specs: ["Switch: Outemu Blue", "Iluminación: Azul", "Anti-ghosting: 19 teclas"], stock: 50, slider: "accesorios" },
                { id: "acc014", name: "TECLADO GAMER CYBERTEL ELEMENT", category: ["perifericos", "gamer"], price: 69.90, images: ["imagenes/tecladoelement.jpg"], rating: 4.0, description: "Teclado gaming con membrana resistente y retroiluminación multicolor.", specs: ["Tipo: Membrana", "Iluminación: RGB", "Teclas: 104"], stock: 50, slider: "accesorios" },
                { id: "acc015", name: "TECLADO MECANICO ENKORE ROYALE", category: ["perifericos", "gamer"], price: 179.90, images: ["imagenes/tecladoroyale.png"], rating: 4.7, description: "Teclado mecánico premium con switches Cherry MX Red y construcción en aluminio.", specs: ["Switch: Cherry MX Red", "Material: Aluminio", "Iluminación: RGB per-key"], stock: 50, slider: "accesorios" },
                { id: "acc016", name: "TECLADO MECANICO ENKORE PATRIOT", category: ["perifericos", "gamer"], price: 159.90, images: ["imagenes/teclado-enkore-patriot.jpg"], rating: 4.6, description: "Teclado mecánico 60% compacto con switches Hot Swappable.", specs: ["Formato: 60%", "Hot Swappable: Sí", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc017", name: "TECLADO MECANICO MICRONICS NEON", category: ["perifericos", "gamer"], price: 129.90, images: ["imagenes/teclado-micronics-neon.webp"], rating: 4.4, description: "Teclado mecánico con switches Blue y retroiluminación RGB fluida.", specs: ["Switch: Blue", "Iluminación: RGB", "Teclas: 87"], stock: 50, slider: "accesorios" },
                { id: "acc018", name: "TECLADO MECANICO HALION STELLAR HA-KG916", category: ["perifericos", "gamer"], price: 149.90, images: ["imagenes/teclado-halion-stellar.jpg"], rating: 4.5, description: "Teclado mecánico gaming con interruptores ópticos y software de personalización.", specs: ["Switch: Óptico Red", "Software: Personalizable", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc019", name: "TECLADO MECANICO HALION ASGARD HA-KG941", category: ["perifericos", "gamer"], price: 199.90, images: ["imagenes/teclado-halion-asgard.jpg"], rating: 4.8, description: "Teclado mecánico TKL con switches Brown y construcción premium.", specs: ["Formato: TKL (80%)", "Switch: Brown", "Material: Aluminio"], stock: 50, slider: "accesorios" },
                { id: "acc020", name: "TECLADO MECANICO HALION ENIGMA HA-KG912", category: ["perifericos", "gamer"], price: 169.90, images: ["imagenes/teclado-halion-enigma.jpg"], rating: 4.6, description: "Teclado mecánico full-size con panel LCD integrado y perfil bajo.", specs: ["Pantalla: LCD integrada", "Perfil: Low-profile", "Switch: Gateron Red"], stock: 50, slider: "accesorios" },
                { id: "acc021", name: "TECLADO MECANICO HALION CLIPPER HA-KG848", category: ["perifericos", "gamer"], price: 119.90, images: ["imagenes/teclado-halion-clipper.png"], rating: 4.3, description: "Teclado mecánico compacto con cable desmontable y modo inalámbrico.", specs: ["Conectividad: Bluetooth/USB-C", "Switch: Kailh Box White", "Batería: 2000mAh"], stock: 50, slider: "accesorios" },
                { id: "acc022", name: "TECLADO MECANICO HALION DROGO HA-K947G", category: ["perifericos", "gamer"], price: 219.90, images: ["imagenes/teclado-halion-drogo.png"], rating: 4.9, description: "Teclado mecánico gaming premium con pantalla táctil y switches Hall Effect.", specs: ["Switch: Hall Effect", "Pantalla: Táctil OLED", "Construcción: Aluminio CNC"], stock: 50, slider: "accesorios" },
                { id: "acc023", name: "TECLADO GENIUS BK-100X", category: ["perifericos", "accesorios"], price: 19.90, images: ["imagenes/teclado-genius-bk100x.webp"], rating: 3.9, description: "Teclado básico USB resistente al agua y polvo.", specs: ["Resistente: Agua y polvo", "Teclas: 104", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                { id: "acc024", name: "TECLADO GENIUS MK-120", category: ["perifericos", "accesorios"], price: 24.90, images: ["imagenes/teclado-genius-mk120.webp"], rating: 4.0, description: "Combo teclado y mouse básico para oficina y hogar.", specs: ["Kit: Teclado + mouse", "Teclas: 104", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                { id: "acc025", name: "COMBO TECLADO GENIUS KM-100SE", category: ["perifericos", "accesorios"], price: 29.90, images: ["imagenes/combo-genius-km100se.jpg"], rating: 4.1, description: "Combo económico con teclado multimedia y mouse óptico.", specs: ["Kit: Teclado + mouse", "Multimedia: Teclas especiales", "DPI mouse: 1000"], stock: 50, slider: "accesorios" },
                { id: "acc026", name: "COMBO TECLADO GENIUS INALAMBRICO LUKEMATE Q8000", category: ["perifericos", "accesorios"], price: 59.90, images: ["imagenes/combo-genius-q8000.jpg"], rating: 4.2, description: "Combo inalámbrico 2.4GHz con teclado delgado y mouse ergonómico.", specs: ["Conectividad: 2.4GHz", "Batería: AAA (x4)", "Alcance: 10m"], stock: 50, slider: "accesorios" },
                { id: "acc027", name: "TECLADO GENIUS BK-100 FREE", category: ["perifericos", "accesorios"], price: 22.90, images: ["imagenes/teclado-genius-bk100free.webp"], rating: 3.8, description: "Teclado USB con diseño resistente a derrames y teclas silenciosas.", specs: ["Resistente: Derrames", "Teclas: 104", "Silencioso: Sí"], stock: 50, slider: "accesorios" },
                { id: "acc028", name: "TECLADO LOGITECH K120", category: ["perifericos", "accesorios"], price: 39.90, images: ["imagenes/teclado-logitech-k120.jpg"], rating: 4.5, description: "Teclado resistente con diseño resistente a salpicaduras y conexión USB.", specs: ["Resistente: Salpicaduras", "Teclas: 104", "Garantía: 2 años"], stock: 50, slider: "accesorios" },
                { id: "acc029", name: "COMBO TECLADO Y MOUSE LOGITECH MK120", category: ["perifericos", "accesorios"], price: 49.90, images: ["imagenes/combo-logitech-mk120.jpg"], rating: 4.6, description: "Combo confiable con teclado de tamaño completo y mouse óptico.", specs: ["Kit: Teclado + mouse", "DPI mouse: 1000", "Garantía: 3 años"], stock: 50, slider: "accesorios" },
                { id: "acc030", name: "TECLADO BASICO MICRONICS PASCAL SLIM", category: ["perifericos", "accesorios"], price: 29.90, images: ["imagenes/teclado-micronics-pascal.webp"], rating: 3.9, description: "Teclado ultra delgado con diseño moderno y teclas de bajo perfil.", specs: ["Perfil: Slim", "Teclas: 104", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                { id: "acc031", name: "TECLADO BASICO ENKORE GEOX SLIM", category: ["perifericos", "accesorios"], price: 27.90, images: ["imagenes/teclado-enkore-geox.jpg"], rating: 4.0, description: "Teclado delgado con teclas silenciosas y diseño resistente.", specs: ["Perfil: Slim", "Teclas: 104", "Silencioso: Sí"], stock: 50, slider: "accesorios" },
                
                // MOUSES (28 productos)
                { id: "acc032", name: "MOUSE INALAMBRICO ENKORE FORTIS", category: ["perifericos", "accesorios"], price: 39.90, images: ["imagenes/mouse-enkore-fortis.jpg"], rating: 4.1, description: "Mouse inalámbrico con sensor óptico de 1600 DPI y diseño ergonómico.", specs: ["DPI: 1600", "Autonomía: 12 meses", "Conexión: USB 2.4G"], stock: 50, slider: "accesorios" },
                { id: "acc033", name: "MOUSE INALAMBRICO MICRONICS GARDINER", category: ["perifericos", "accesorios"], price: 34.90, images: ["imagenes/mouse-micronics-gardiner.webp"], rating: 4.0, description: "Mouse óptico inalámbrico con 3 botones y rueda de desplazamiento.", specs: ["DPI: 1200", "Botones: 3", "Batería: AA x1"], stock: 50, slider: "accesorios" },
                { id: "acc034", name: "MOUSE INALAMBRICO CYBERTEL CYCLONE", category: ["perifericos", "accesorios"], price: 29.90, images: ["imagenes/mouse-cybertel-cyclone.webp"], rating: 3.8, description: "Mouse inalámbrico compacto con receptor nano USB.", specs: ["DPI: 1000", "Receptor: Nano USB", "Peso: 65g"], stock: 50, slider: "accesorios" },
                { id: "acc035", name: "MOUSE GENIUS DX110", category: ["perifericos", "accesorios"], price: 25.90, images: ["imagenes/mouse-genius-dx110.webp"], rating: 3.7, description: "Mouse óptico con cable USB y 3 botones para uso diario.", specs: ["DPI: 1000", "Botones: 3", "Cable: 1.5m"], stock: 50, slider: "accesorios" },
                { id: "acc036", name: "GENIUS DX MINI", category: ["perifericos", "accesorios"], price: 25.90, images: ["imagenes/mouse-genius-dxmini.webp"], rating: 3.9, description: "Mouse compacto con diseño portátil y sensor óptico.", specs: ["DPI: 1000", "Formato: Compacto", "Cable: 1.2m"], stock: 50, slider: "accesorios" },
                { id: "acc037", name: "MOUSE INALAMBRICO GENIUS NX7000", category: ["perifericos", "accesorios"], price: 44.90, images: ["imagenes/mouse-genius-nx7000.webp"], rating: 4.2, description: "Mouse inalámbrico ergonómico con botones laterales y 1600 DPI.", specs: ["DPI: 1600", "Botones: 6", "Batería: AA x1"], stock: 50, slider: "accesorios" },
                { id: "acc038", name: "MOUSE INALAMBRICO GENIUS NX7009", category: ["perifericos", "accesorios"], price: 49.90, images: ["imagenes/mouse-genius-nx7009.webp"], rating: 4.3, description: "Mouse inalámbrico con sensor de alta precisión y diseño ambidiestro.", specs: ["DPI: 2400", "Botones: 6", "Diseño: Ambidiestro"], stock: 50, slider: "accesorios" },
                { id: "acc039", name: "MOUSE GAMER GENIUS SCORPIO M700", category: ["perifericos", "gamer"], price: 79.90, images: ["imagenes/mouse-genius-scorpio.jpg"], rating: 4.4, description: "Mouse gaming con sensor PixArt 3325 y retroiluminación RGB.", specs: ["Sensor: PixArt 3325", "DPI: 5000", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc040", name: "MOUSE LOGITECH M90", category: ["perifericos", "accesorios"], price: 25.00, images: ["imagenes/mouse-logitech-m90.jpg"], rating: 4.6, description: "Mouse con cable USB y óptica de seguimiento preciso.", specs: ["DPI: 1000", "Botones: 3", "Garantía: 2 años"], stock: 50, slider: "accesorios" },
                { id: "acc041", name: "MOUSE INALAMBRICO LOGITECH M170", category: ["perifericos", "accesorios"], price: 39.90, images: ["imagenes/mouse-logitech-m170.jpg"], rating: 4.7, description: "Mouse inalámbrico compacto con batería de 12 meses de duración.", specs: ["Autonomía: 12 meses", "DPI: 1000", "Receptor: Nano USB"], stock: 50, slider: "accesorios" },
                { id: "acc042", name: "MOUSE INALAMBRICO LOGITECH M240", category: ["perifericos", "accesorios"], price: 49.90, images: ["imagenes/mouse-logitech-m240.webp"], rating: 4.8, description: "Mouse silencioso con clics casi imperceptibles y conexión Bluetooth.", specs: ["Clics: Silenciosos", "Conectividad: Bluetooth", "Autonomía: 18 meses"], stock: 50, slider: "accesorios" },
                { id: "acc043", name: "MOUSE GAMER LOGITECH G203", category: ["perifericos", "gamer"], price: 99.90, images: ["imagenes/mouse-logitech-g203.jpg"], rating: 4.9, description: "Mouse gaming con sensor LIGHTSYNC RGB y 8 botones programables.", specs: ["Sensor: 8000 DPI", "Botones: 8", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc044", name: "MOUSE GAMER INALAMBRICO LOGITECH G305", category: ["perifericos", "gamer"], price: 149.90, images: ["imagenes/mouse-logitech-g305.webp"], rating: 4.9, description: "Mouse gaming inalámbrico con sensor HERO y latencia ultra baja.", specs: ["Sensor: HERO 12K", "Latencia: 1ms", "Autonomía: 250 horas"], stock: 50, slider: "accesorios" },
                { id: "acc045", name: "MOUSE INALAMBRICO MICRONICS SHELBY", category: ["perifericos", "accesorios"], price: 29.90, images: ["imagenes/mouse-micronics-shelby.jpg"], rating: 4.0, description: "Mouse inalámbrico con diseño ergonómico y rueda de desplazamiento suave.", specs: ["DPI: 1600", "Botones: 3", "Batería: AAA x1"], stock: 50, slider: "accesorios" },
                { id: "acc046", name: "MOUSE INALAMBRICO CYBERTEL DERBY", category: ["perifericos", "accesorios"], price: 24.90, images: ["imagenes/mouse-cybertel-derby.webp"], rating: 3.9, description: "Mouse óptico inalámbrico con receptor USB y 1200 DPI.", specs: ["DPI: 1200", "Receptor: USB", "Peso: 70g"], stock: 50, slider: "accesorios" },
                { id: "acc047", name: "MOUSE INALAMBRICO MICRONICS CAPRICE", category: ["perifericos", "accesorios"], price: 34.90, images: ["imagenes/mouse-micronics-caprice.jpg"], rating: 4.1, description: "Mouse inalámbrico con diseño curvo y botones laterales.", specs: ["Botones: 6", "DPI: 2400", "Batería: AA x1"], stock: 50, slider: "accesorios" },
                { id: "acc048", name: "MOUSE INALAMBRICO CYBERTEL CYBORG", category: ["perifericos", "accesorios"], price: 39.90, images: ["imagenes/mouse-cybertel-cyborg.avif"], rating: 4.2, description: "Mouse gaming inalámbrico con iluminación RGB y diseño agresivo.", specs: ["Iluminación: RGB", "DPI: 3200", "Botones: 6"], stock: 50, slider: "accesorios" },
                { id: "acc049", name: "MOUSE INALAMBRICO MICRONICS FOLIE", category: ["perifericos", "accesorios"], price: 44.90, images: ["imagenes/mouse-micronics-folie.webp"], rating: 4.3, description: "Mouse inalámbrico con Bluetooth 5.0 y triple conexión (USB/Bluetooth).", specs: ["Conectividad: Bluetooth 5.0 + USB", "DPI: 1600", "Batería: 500mAh"], stock: 50, slider: "accesorios" },
                { id: "acc050", name: "MOUSE GAMER MICRONICS GRAGON", category: ["perifericos", "gamer"], price: 69.90, images: ["imagenes/mouse-micronics-gragon.webp"], rating: 4.4, description: "Mouse gaming con sensor PMW3325 y retroiluminación RGB ajustable.", specs: ["Sensor: PMW3325", "DPI: 5000", "Iluminación: RGB 7 modos"], stock: 50, slider: "accesorios" },
                { id: "acc051", name: "MOUSE GAMER MICRONICS INFERNO", category: ["perifericos", "gamer"], price: 89.90, images: ["imagenes/mouse-micronics-inferno.webp"], rating: 4.5, description: "Mouse gaming con sensor óptico de 7200 DPI y 7 botones programables.", specs: ["DPI: 7200", "Botones: 7", "Peso: 120g"], stock: 50, slider: "accesorios" },
                { id: "acc052", name: "MOUSE GAMER MICRONICS KRIPTON", category: ["perifericos", "gamer"], price: 99.90, images: ["imagenes/mouse-micronics-kripton.webp"], rating: 4.6, description: "Mouse gaming con cable trenzado y diseño ergonómico para palma.", specs: ["Cable: Trenzado", "Diseño: Para palma", "DPI: 6400"], stock: 50, slider: "accesorios" },
                { id: "acc053", name: "MOUSE GAMER MICRONICS PLAYER", category: ["perifericos", "gamer"], price: 59.90, images: ["imagenes/mouse-micronics-player.jpg"], rating: 4.3, description: "Mouse gaming económico con iluminación RGB y 6 botones.", specs: ["Botones: 6", "Iluminación: RGB", "DPI: 3200"], stock: 50, slider: "accesorios" },
                { id: "acc054", name: "MOUSE GAMER MICRONICS X-BYTE", category: ["perifericos", "gamer"], price: 79.90, images: ["imagenes/mouse-micronics-xbyte.webp"], rating: 4.4, description: "Mouse gaming con sensor PixArt 3389 y peso ajustable.", specs: ["Sensor: PixArt 3389", "Peso: Ajustable", "DPI: 16000"], stock: 50, slider: "accesorios" },
                { id: "acc055", name: "MOUSE GAMER MICRONICS ANONIMUS", category: ["perifericos", "gamer"], price: 129.90, images: ["imagenes/mouse-micronics-anonimus.webp"], rating: 4.7, description: "Mouse gaming profesional con sensor óptico de 19000 DPI y cable paracord.", specs: ["DPI: 19000", "Cable: Paracord", "Botones: 8"], stock: 50, slider: "accesorios" },
                
                // AUDÍFONOS (13 productos)
                { id: "acc056", name: "AUDIFONO GAMER MARVEL SPIDERMAN XTH M565SG", category: ["audio", "gamer"], price: 199.90, images: ["imagenes/audifono-marvel-spiderman.jpg"], rating: 4.7, description: "Audífono gamer temático de Spiderman con sonido envolvente 7.1.", specs: ["Conectividad: USB/3.5mm", "Micrófono: Desmontable", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc057", name: "AUDIFONO GAMER MARVEL SPIDERMAN XTH M541SM", category: ["audio", "gamer"], price: 179.90, images: ["imagenes/audifono-marvel-spiderman-m541.jpg"], rating: 4.6, description: "Audífono gamer Spiderman con micrófono flexible y almohadillas memory foam.", specs: ["Almohadillas: Memory foam", "Micrófono: Flexible", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                { id: "acc058", name: "AUDIFONO HALION HELL HA-H856", category: ["audio", "gamer"], price: 149.90, images: ["imagenes/audifono-halion-hell.webp"], rating: 4.5, description: "Audífono gaming con sonido 7.1 virtual y micrófono con cancelación de ruido.", specs: ["Sonido: 7.1 virtual", "Cancelación ruido: Sí", "Iluminación: RGB"], stock: 50, slider: "accesorios" },
                { id: "acc059", name: "AUDIFONO HALION MERCURY HA-H867", category: ["audio", "gamer"], price: 169.90, images: ["imagenes/audifono-halion-mercury.jpg"], rating: 4.6, description: "Audífono inalámbrico gaming con Bluetooth 5.2 y baja latencia.", specs: ["Conectividad: Bluetooth 5.2", "Latencia: 40ms", "Batería: 30 horas"], stock: 50, slider: "accesorios" },
                { id: "acc060", name: "AUDIFONO HALION SPARROW HA-H854", category: ["audio", "gamer"], price: 129.90, images: ["imagenes/audifono-halion-sparrow.png"], rating: 4.4, description: "Audífono gaming liviano con drivers de 50mm y diseño over-ear.", specs: ["Drivers: 50mm", "Peso: 250g", "Conectividad: 3.5mm"], stock: 50, slider: "accesorios" },
                { id: "acc061", name: "AUDIFONOS INALAMBRICO TEROS TE-8036N", category: ["audio", "accesorios"], price: 89.90, images: ["imagenes/audifono-teros-inalambrico.webp"], rating: 4.3, description: "Audífonos inalámbricos con cancelación de ruido y modo manos libres.", specs: ["Cancelación ruido: Sí", "Batería: 20 horas", "Bluetooth: 5.0"], stock: 50, slider: "accesorios" },
                { id: "acc062", name: "AUDIFONO GAMER ENKORE ACTIVE BLANCO", category: ["audio", "gamer"], price: 119.90, images: ["imagenes/audifono-enkore-active-blanco.jpg"], rating: 4.5, description: "Audífono gaming blanco con micrófono retráctil y control de volumen.", specs: ["Micrófono: Retráctil", "Control: En cable", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                { id: "acc063", name: "AUDIFONO GAMER ENKORE ACTIVE NEGRO", category: ["audio", "gamer"], price: 119.90, images: ["imagenes/audifono-enkore-active-negro.jpg"], rating: 4.5, description: "Audífono gaming negro con sonido estéreo y almohadillas suaves.", specs: ["Sonido: Estéreo", "Almohadillas: Piel sintética", "Conectividad: 3.5mm"], stock: 50, slider: "accesorios" },
                { id: "acc064", name: "AUDIFONO GAMER ENKORE FALCON", category: ["audio", "gamer"], price: 149.90, images: ["imagenes/audifono-enkore-falcon.webp"], rating: 4.6, description: "Audífono gaming con drivers de 53mm y sistema de sonido 7.1 virtual.", specs: ["Drivers: 53mm", "Sonido: 7.1 virtual", "Micrófono: Direccional"], stock: 50, slider: "accesorios" },
                { id: "acc065", name: "AUDIFONO GAMER CYBERTEL DESTROYER", category: ["audio", "gamer"], price: 99.90, images: ["imagenes/audifono-cybertel-destroyer.webp"], rating: 4.4, description: "Audífono gaming con iluminación LED y micrófono con cancelación de eco.", specs: ["Iluminación: LED", "Cancelación eco: Sí", "Conectividad: USB"], stock: 50, slider: "accesorios" },
                
                // OTROS PRODUCTOS (5 productos)
                { id: "acc066", name: "LAPIZ TARGUS PARA TABLET", category: ["accesorios"], price: 89.90, images: ["imagenes/lapiz-targus-tablet.webp"], rating: 4.3, description: "Lápiz digital compatible con tablets Android y iOS, presión 2048 niveles.", specs: ["Compatibilidad: Universal", "Presión: 2048 niveles", "Batería: Recargable"], stock: 50, slider: "accesorios" },
                { id: "acc067", name: "TABLET ADVANCE NOVAPAD NP6070", category: ["tablets"], price: 499.00, images: ["imagenes/tablet-advance-novapad.jpg"], rating: 4.2, description: "Tablet Android 12 con pantalla HD 10.1\", 4GB RAM y 64GB almacenamiento.", specs: ["Pantalla: 10.1\" HD", "RAM: 4GB", "Almacenamiento: 64GB"], stock: 50, slider: "accesorios" },
                { id: "acc068", name: "CASE CIBERMAX APICO CBX 5008R SIN FUENTE", category: ["componentes"], price: 79.90, images: ["imagenes/gabinete-cibermax.webp"], rating: 4.0, description: "Gabinete gaming con panel lateral templado y espacio para 6 ventiladores.", specs: ["Panel lateral: Templado", "Ventiladores: 6 posiciones", "RGB: Sí"], stock: 50, slider: "accesorios" },
                { id: "acc069", name: "Monitor curvo gaming TEROS TE-2471G", category: ["monitores", "gamer"], price: 399.00, oldPrice: 419.00, images: ["imagenes/monitor-teros-gaming.webp"], rating: 4.8, description: "Monitor curvo 23.8\" FHD VA, 165Hz, 2ms, HDMI, DP - Experiencia gaming inmersiva", specs: ["Tamaño: 23.8\" Curvo 3000R", "Resolución: Full HD (1920x1080)", "Tasa de refresco: 165Hz", "Tiempo de respuesta: 2ms", "Conectores: HDMI, DisplayPort"], stock: 50, slider: "ofertas" },
                { id: "acc073", name: "BACKPACK TEROS WORK BLACK/GREY", category: ["accesorios"], price: 99.00, images: ["imagenes/mochila-teros-work.jpeg"], rating: 4.5, description: "Mochila para notebooks hasta 15.6\" con múltiples compartimentos y diseño ergonómico.", specs: ["Capacidad: Notebooks hasta 15.6\"", "Compartimentos: 3 principales", "Bolsillos laterales para botellas", "Material: Poliéster resistente"], stock: 50, slider: "accesorios" }
            ]
        };
    }

    async getProducts() {
        return new Promise(resolve => setTimeout(() => resolve(this.db.products), 250));
    }
}

class Store {
    constructor() {
        this.state = {
            products: [],
            cart: this.loadFromLocalStorage('shoppingCart', []),
            filters: { category: 'all', searchTerm: '', sort: 'default' }
        };
        this.subscribers = {};
        
        this.removeMousepadFromCart();
    }

    removeMousepadFromCart() {
        const initialLength = this.state.cart.length;
        this.state.cart = this.state.cart.filter(item => item.id !== "acc006");
        this.state.cart = this.state.cart.filter(item => 
            !item.title.includes("MOUSEPAD") && 
            !item.title.includes("STEELSERIES")
        );
        if (this.state.cart.length !== initialLength) {
            this.saveToLocalStorage('shoppingCart', this.state.cart);
        }
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(callback);
    }

    publish(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(callback => callback(data));
    }

    getCart() { return this.state.cart; }
    getProductById(id) { return this.state.products.find(p => p.id === id); }

    getProductsForSuggestion(term, limit = 5) {
        if (!term) return [];
        const lowercasedTerm = term.toLowerCase();
        const results = this.state.products.filter(p => p.name.toLowerCase().includes(lowercasedTerm));
        return results.slice(0, limit);
    }

    getFilteredProducts() {
        const { category, searchTerm, sort } = this.state.filters;
        let filtered = [...this.state.products];

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category.includes(category));
        }

        if (searchTerm) {
            const searchTokens = searchTerm.toLowerCase().split(' ').filter(token => token.length > 0);
            if (searchTokens.length > 0) {
                filtered = filtered.filter(product => {
                    const searchableString = [
                        product.name, product.id, product.description,
                        ...product.category, ...product.specs
                    ].join(' ').toLowerCase();
                    return searchTokens.every(token => searchableString.includes(token));
                });
            }
        }

        switch (sort) {
            case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'rating-desc': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
        }
        return filtered;
    }

    setProducts(products) {
        this.state.products = products;
        this.publish('productsUpdated', this.getFilteredProducts());
    }

    setFilters(newFilters) {
        this.state.filters = { ...this.state.filters, ...newFilters };
        this.publish('productsUpdated', this.getFilteredProducts());
    }

    addToCart(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product || product.stock < quantity) {
            this.publish('notification', { message: `No hay suficiente stock para ${product.name}.` });
            return;
        }
        const existingItem = this.state.cart.find(item => item.id === productId);
        if (existingItem) existingItem.quantity += quantity;
        else this.state.cart.push({ id: product.id, title: product.name, price: product.price, img: product.images[0], quantity });
        this.saveToLocalStorage('shoppingCart', this.state.cart);
        this.publish('cartUpdated', this.state.cart);
        this.publish('notification', { message: `${product.name} añadido al carrito.` });
    }

    removeFromCart(productId) {
        const itemIndex = this.state.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = this.state.cart.splice(itemIndex, 1)[0];
            this.saveToLocalStorage('shoppingCart', this.state.cart);
            this.publish('cartUpdated', this.state.cart);
            this.publish('notification', { message: `${removedItem.title} eliminado del carrito.` });
        }
    }

    saveToLocalStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error('Error saving to localStorage', e); }
    }
    loadFromLocalStorage(key, defaultValue) {
        try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : defaultValue; } catch (e) { console.error('Error loading from localStorage', e); return defaultValue; }
    }
}

class SearchComponent {
    constructor(store, modalComponent) {
        this.store = store;
        this.modal = modalComponent;
        this.input = document.getElementById('searchInputHeader');
        this.suggestionsContainer = document.getElementById('search-suggestions');
        this.form = document.getElementById('searchForm');

        this.debouncedFilterUpdate = Utils.debounce((term) => {
            this.store.setFilters({ searchTerm: term });
        }, 350);

        this.initListeners();
    }

    initListeners() {
        if (!this.input || !this.suggestionsContainer || !this.form) {
            console.warn('Search component elements not found.');
            return;
        }
        this.input.addEventListener('input', (e) => {
            const term = e.target.value;
            this.showSuggestions(term);
            this.debouncedFilterUpdate(term);
        });

        document.addEventListener('click', (e) => {
            if (!this.suggestionsContainer.contains(e.target) && e.target !== this.input) {
                this.hideSuggestions();
            }
        });

        this.suggestionsContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.suggestion-item');
            if (item && item.dataset.productId) {
                this.handleSuggestionClick(item.dataset.productId);
            }
        });

        this.form.addEventListener('submit', (e) => e.preventDefault());
    }

    showSuggestions(term) {
        if (term.length < 2) {
            this.hideSuggestions();
            return;
        }
        const suggestedProducts = this.store.getProductsForSuggestion(term, 5);

        if (suggestedProducts.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.suggestionsContainer.innerHTML = suggestedProducts.map(p => this.createSuggestionHTML(p)).join('');
        this.suggestionsContainer.classList.add('visible');
    }

    hideSuggestions() {
        this.suggestionsContainer.classList.remove('visible');
    }

    handleSuggestionClick(productId) {
        this.modal.open(productId);
        this.input.value = '';
        this.hideSuggestions();
    }

    createSuggestionHTML(product) {
        return `
            <div class="suggestion-item" data-product-id="${product.id}" role="button" tabindex="0">
                <img src="${product.images[0]}" alt="${product.name}" class="suggestion-item__img">
                <div class="suggestion-item__info">
                    <span class="suggestion-item__name">${product.name}</span>
                    <span class="suggestion-item__price">${Utils.formatCurrency(product.price)}</span>
                </div>
            </div>
        `;
    }
}

class ProductSlider {
    constructor(selector, store) {
        this.sliderElement = document.querySelector(selector);
        if (!this.sliderElement) {
            // console.error(`Slider element not found with selector: ${selector}`); // Silenced for cleaner console
            return;
        }
        
        this.store = store;
        this.sliderKey = this.sliderElement.id.replace('Slider', '');
        this.track = this.sliderElement; // In current HTML, the ID is directly on the track
        this.prevBtn = document.getElementById(`${this.sliderKey}Prev`);
        this.nextBtn = document.getElementById(`${this.sliderKey}Next`);
        this.position = 0;
        this.itemWidth = 280; // Default, will be recalculated
        
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.slide(-1));
            this.nextBtn.addEventListener('click', () => this.slide(1));
        } else {
            // console.error(`Navigation buttons not found for slider: ${this.sliderKey}`); // Silenced
        }
        
        this.store.subscribe('productsUpdated', (products) => this.render(products));
        window.addEventListener('resize', Utils.debounce(() => this.recalculateLayout(), 200));
        
        this.recalculateLayout();
    }

    slide(direction) {
        if (!this.track.children.length) return;
        
        const visibleItems = this.getVisibleItemsCount();
        const totalItems = this.track.children.length;
        
        if (totalItems <= visibleItems) { // No sliding if all items are visible
            this.updateNavButtons(0, totalItems, visibleItems); // Update to disable if needed
            return;
        }
        
        const maxPositionIndex = totalItems - visibleItems;
        let currentPositionIndex = Math.round(-this.position / this.itemWidth);

        currentPositionIndex += direction;
        currentPositionIndex = Math.max(0, Math.min(currentPositionIndex, maxPositionIndex));
        
        this.position = -currentPositionIndex * this.itemWidth;
        this.track.style.transform = `translateX(${this.position}px)`;
        this.updateNavButtons(currentPositionIndex, totalItems, visibleItems);
    }
    
    updateNavButtons(currentPositionIndex, totalItems, visibleItems) {
        if (!this.prevBtn || !this.nextBtn) return;

        if (totalItems <= visibleItems) { // If all items are visible or fewer
            this.prevBtn.disabled = true;
            this.nextBtn.disabled = true;
            return;
        }
        this.prevBtn.disabled = currentPositionIndex === 0;
        this.nextBtn.disabled = currentPositionIndex >= totalItems - visibleItems;
    }


    recalculateLayout() {
        if (!this.track || !this.track.children.length || !this.track.parentElement) return;
        
        this.position = 0;
        this.track.style.transform = 'translateX(0px)';
        const firstCard = this.track.querySelector('.product-card');
        
        if (firstCard) {
            const cardStyle = window.getComputedStyle(firstCard);
            const cardMargin = parseFloat(cardStyle.marginRight) || 0; // Assuming gap is used, marginRight might be 0
            const gap = parseFloat(window.getComputedStyle(this.track).gap) || 20; // Use actual gap
            this.itemWidth = firstCard.offsetWidth + gap;
        }
        const visibleItems = this.getVisibleItemsCount();
        const totalItems = this.track.children.length;
        this.updateNavButtons(0, totalItems, visibleItems); // Update navs on resize
    }

    getVisibleItemsCount() {
        if (!this.sliderElement.parentElement || this.itemWidth === 0) return 1;
        const containerWidth = this.sliderElement.parentElement.offsetWidth;
        return Math.floor(containerWidth / this.itemWidth);
    }

    createProductCardHTML(product) {
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const discountPercent = hasDiscount ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${hasDiscount ? `<span class="badge">-${discountPercent}% OFF</span>` : ''}
                <a href="#" class="product-image-link" data-action="openModal"><img src="${product.images[0] || 'imagenes/placeholder.png'}" alt="${product.name}" loading="lazy"></a>
                <div class="product-card-info">
                    <div>
                        <h3 class="product-title"><a href="#" data-action="openModal">${product.name}</a></h3>
                        <div class="product-rating">${Utils.getStarRatingHTML(product.rating)}</div>
                        <p class="product-subtitle">${product.description.substring(0, 50)}...</p>
                    </div>
                    <div class="product-price-container">
                        <span class="product-price">${Utils.formatCurrency(product.price)}</span>
                        ${hasDiscount ? `<span class="old-price">${Utils.formatCurrency(product.oldPrice)}</span>` : ''}
                    </div>
                </div>
                <div class="product-actions">
                    <button class="action-button view-details-btn" data-action="openModal"><i class="fas fa-eye"></i> Ver Detalles</button>
                    <button class="action-button add-cart-btn" data-action="addToCart"><i class="fas fa-cart-plus"></i> Añadir</button>
                </div>
            </div>`;
    }

    render(allProducts) {
        if (!this.track) return;
        
        const productsForThisSlider = allProducts.filter(p => p.slider === this.sliderKey);
        if (productsForThisSlider.length > 0) {
            this.track.innerHTML = productsForThisSlider.map(p => this.createProductCardHTML(p)).join('');
        } else {
            this.track.innerHTML = `<p class="empty-slider-message">No hay productos en esta sección.</p>`;
        }
        this.recalculateLayout(); // Recalculate after rendering
    }
}

class CartComponent {
    constructor(store) {
        this.store = store;
        this.cartIconBtn = document.getElementById('cart-icon-btn');
        this.cartDropdown = document.getElementById('cartDropdown');
        this.cartCountDisplays = document.querySelectorAll('.cart-count');
        this.cartItemsContainer = document.getElementById('cartItemsContainer');
        this.cartTotalDisplay = document.getElementById('cartTotal');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        
        if (!this.cartIconBtn || !this.cartDropdown || !this.cartItemsContainer || !this.cartTotalDisplay || !this.checkoutBtn) {
            console.warn('Cart component elements not fully found.');
            return;
        }
        
        this.store.subscribe('cartUpdated', (cart) => this.render(cart));
        this.cartIconBtn.addEventListener('click', (e) => this.toggle(e));
        document.addEventListener('click', (e) => this.closeIfClickedOutside(e));
        this.cartItemsContainer.addEventListener('click', (e) => this.handleItemAction(e));
        this.render(this.store.getCart());
    }

    toggle(event) {
        event.stopPropagation();
        const isVisible = this.cartDropdown.classList.toggle('visible');
        this.cartIconBtn.setAttribute('aria-expanded', isVisible);
    }

    closeIfClickedOutside(event) {
        if (!this.cartDropdown.classList.contains('visible') || 
            this.cartDropdown.contains(event.target) || 
            this.cartIconBtn.contains(event.target)) return;
            
        this.cartDropdown.classList.remove('visible');
        this.cartIconBtn.setAttribute('aria-expanded', 'false');
    }

    handleItemAction(event) {
        const removeButton = event.target.closest('.cart-item-remove');
        if (removeButton) this.store.removeFromCart(removeButton.dataset.id);
    }

    createCartItemHTML(item) {
        return `
            <div class="cart-item">
                <img src="${item.img || 'imagenes/placeholder.png'}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${Utils.formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">Cant: ${item.quantity}</div>
                </div>
                <div class="cart-item-subtotal">${Utils.formatCurrency(item.price * item.quantity)}</div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar ${item.title}"><i class="fas fa-times"></i></button>
            </div>`;
    }

    render(cart) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        this.cartCountDisplays.forEach(el => el.textContent = count);
        if (this.cartTotalDisplay) this.cartTotalDisplay.textContent = Utils.formatCurrency(total);
        if (this.checkoutBtn) this.checkoutBtn.disabled = count === 0;
        
        if (count > 0) {
            this.cartItemsContainer.innerHTML = cart.map(item => this.createCartItemHTML(item)).join('');
        } else {
            this.cartItemsContainer.innerHTML = `<p class="empty-cart-message">Tu carrito está vacío.</p>`;
        }
    }
}

class ModalComponent {
    constructor(store) {
        this.store = store;
        this.overlay = document.getElementById('productModalOverlay');
        
        if (!this.overlay) {
            // console.error('Modal overlay not found'); // Silenced
            return;
        }
        
        // These elements are dynamically rendered, so we'll query them inside render() or event handlers
        this.content = null; 
        this.closeBtn = null;
        this.currentProduct = null; // Store the product for actions
        
        this.overlay.addEventListener('click', (e) => { 
            if (e.target === this.overlay && this.isOpen()) this.close(); 
        });
        
        document.addEventListener('keydown', (e) => { 
            if (e.key === 'Escape' && this.isOpen()) this.close(); 
        });

        // Delegated event listener for modal content
        this.overlay.addEventListener('click', (e) => {
            if (!this.currentProduct) return; // Modal not fully open or product not set

            const addToCartBtn = e.target.closest('[data-modal-action="addToCart"]');
            const decreaseQtyBtn = e.target.closest('[data-modal-action="decreaseQty"]');
            const increaseQtyBtn = e.target.closest('[data-modal-action="increaseQty"]');
            const closeModalBtn = e.target.closest('.modal-close-btn'); // Re-select close button if inside modal
            const thumbnailBtn = e.target.closest('.modal-thumbnail button');

            if (addToCartBtn) this.handleAddToCart();
            else if (decreaseQtyBtn) this.updateQuantity(-1);
            else if (increaseQtyBtn) this.updateQuantity(1);
            else if (closeModalBtn) this.close();
            else if (thumbnailBtn) {
                 const mainImg = this.overlay.querySelector('#modalMainImg');
                 if (mainImg) mainImg.src = this.currentProduct.images[thumbnailBtn.dataset.index];
                 this.overlay.querySelectorAll('.modal-thumbnail button').forEach(t => t.classList.remove('active'));
                 thumbnailBtn.classList.add('active');
            }
        });
    }

    isOpen() {
        return this.overlay && this.overlay.classList.contains('visible');
    }

    open(productId) {
        if (!this.overlay) return;
        const product = this.store.getProductById(productId);
        if (!product) return console.error(`Product with ID ${productId} not found.`);
        
        this.currentProduct = product; // Store for actions
        this.render(product); // This will create this.content and this.closeBtn

        document.body.style.overflow = 'hidden';
        this.overlay.style.display = 'flex'; // Make it part of layout before animating
        
        requestAnimationFrame(() => { // Ensure display:flex is applied
            this.overlay.classList.add('visible');
            if(this.content) this.content.classList.add('animated', 'zoomIn', 'faster');
        });
    }

    close() {
        if (!this.isOpen() || !this.content) return;
        
        this.content.classList.replace('zoomIn', 'zoomOut');
        this.overlay.classList.remove('visible');
        
        const onAnimationEnd = () => {
            document.body.style.overflow = '';
            if (this.content) this.content.classList.remove('animated', 'zoomOut', 'faster');
            this.overlay.style.display = 'none'; // Hide after animation
            this.currentProduct = null;
            if (this.content) this.content.removeEventListener('animationend', onAnimationEnd);
            this.content = null; // Clear content reference
        };
        this.content.addEventListener('animationend', onAnimationEnd, { once: true });
    }

    handleAddToCart() {
        const qtyInput = this.overlay.querySelector('#modalQuantityInput');
        if (!qtyInput || !this.currentProduct) return;
        
        this.store.addToCart(this.currentProduct.id, parseInt(qtyInput.value, 10));
        this.close();
    }

    updateQuantity(change) {
        const qtyInput = this.overlay.querySelector('#modalQuantityInput');
        if (!qtyInput || !this.currentProduct) return;
        
        let newQuantity = Math.max(1, parseInt(qtyInput.value, 10) + change);
        if (newQuantity > this.currentProduct.stock) {
            newQuantity = this.currentProduct.stock;
            this.store.publish('notification', { message: `Solo quedan ${this.currentProduct.stock} unidades.` });
        }
        qtyInput.value = newQuantity;
    }

    render(product) {
        const hasDiscount = product.oldPrice && product.oldPrice > product.price;
        const stockStatus = product.stock > 0
            ? `<div class="modal-stock in-stock">En Stock (${product.stock})</div>`
            : `<div class="modal-stock out-of-stock">Agotado</div>`;
        
        let thumbnailsHTML = '';
        if (product.images.length > 1) {
            thumbnailsHTML = product.images.map((img, index) => `
                <div class="modal-thumbnail">
                    <button ${index === 0 ? 'class="active"' : ''} data-index="${index}" aria-label="Ver imagen ${index + 1}">
                        <img src="${img || 'imagenes/placeholder.png'}" alt="Miniatura ${index + 1} de ${product.name}">
                    </button>
                </div>
            `).join('');
        }
        
        // Ensure overlay innerHTML is set with the new modal content structure
        this.overlay.innerHTML = `
            <div class="modal-content"> 
                <button class="modal-close-btn" aria-label="Cerrar modal"><i class="fas fa-times"></i></button>
                <div class="modal-left">
                  <div class="modal-main-img-container">
                    <img id="modalMainImg" src="${product.images[0] || 'imagenes/placeholder.png'}" alt="Imagen principal del producto ${product.name}" /> 
                  </div>
                  ${product.images.length > 1 ? `<div id="modalThumbnails" class="modal-thumbnails">${thumbnailsHTML}</div>` : ''}
                </div>
                <div class="modal-right">
                  <h2 id="modalTitle" class="modal-title">${product.name}</h2>
                  <div class="modal-meta-info">
                    <div class="modal-rating" id="modalRating">${Utils.getStarRatingHTML(product.rating)}</div>
                    <div class="modal-stock" id="modalStockStatus">${stockStatus}</div>
                  </div>
                  <div class="modal-price-container">
                    <span id="modalPrice" class="modal-price">${Utils.formatCurrency(product.price)}</span>
                    ${hasDiscount ? `<span id="modalOldPrice" class="modal-old-price">${Utils.formatCurrency(product.oldPrice)}</span>` : `<span id="modalOldPrice" class="modal-old-price hidden"></span>`}
                  </div>
                  <p id="modalDescription" class="modal-description">${product.description}</p>
                  <div class="modal-specs-container"> 
                    <h3>Especificaciones Técnicas:</h3>
                    <div id="modalSpecs" class="modal-specs-list">
                        <ul>${product.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>
                    </div> 
                  </div>
                  <div class="modal-actions"> 
                    <div class="quantity-control">
                      <button class="quantity-btn decrease-qty-btn" data-modal-action="decreaseQty" aria-label="Disminuir cantidad"><i class="fas fa-minus"></i></button>
                      <input id="modalQuantityInput" type="text" inputmode="numeric" value="1" min="1" readonly class="quantity-input" aria-label="Cantidad de producto"/>
                      <button class="quantity-btn increase-qty-btn" data-modal-action="increaseQty" aria-label="Aumentar cantidad"><i class="fas fa-plus"></i></button>
                    </div>
                    <button id="modalAddToCartBtn" class="modal-action-btn modal-add-to-cart-btn" data-modal-action="addToCart" ${product.stock === 0 ? 'disabled' : ''}>
                      <i class="fas fa-cart-plus"></i> AÑADIR AL CARRITO
                    </button>
                  </div>
                </div>
            </div>`;

        // After rendering, get references to the newly created elements
        this.content = this.overlay.querySelector('.modal-content');
        // this.closeBtn = this.overlay.querySelector('.modal-close-btn'); // Listener is now delegated on overlay
    }
}


class NotificationComponent {
    constructor(store) {
        this.container = document.getElementById('notification-container');
        if (!this.container) {
            // console.error('Notification container not found'); // Silenced
            return;
        }
        store.subscribe('notification', (data) => this.show(data.message));
    }

    show(message, duration = 3000) {
        if(!this.container) return;
        const el = document.createElement('div');
        el.className = 'notification';
        el.textContent = message;
        this.container.appendChild(el);
        requestAnimationFrame(() => el.classList.add('visible')); // Ensures transition happens
        setTimeout(() => {
            el.classList.remove('visible');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
        }, duration);
    }
}

// NEW: Promo Carousel Component
class PromoCarousel {
    constructor(selector) {
        this.carousel = document.getElementById(selector);
        if (!this.carousel) {
            // console.warn(`Promo carousel with selector #${selector} not found.`);
            return;
        }

        this.inner = this.carousel.querySelector('.promo-carousel-inner');
        this.slides = Array.from(this.inner.querySelectorAll('.promo-carousel-slide'));
        this.prevButton = this.carousel.querySelector('.carousel-prev');
        this.nextButton = this.carousel.querySelector('.carousel-next');
        this.dotsContainer = this.carousel.querySelector('.carousel-dots');

        if (!this.inner || this.slides.length === 0 || !this.prevButton || !this.nextButton || !this.dotsContainer) {
            console.error('Promo carousel is missing required inner elements (inner, slides, prev/next buttons, or dots container).');
            return;
        }

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        // this.autoplayInterval = null;
        // this.autoplayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        this.createDots();
        this.updateCarousel();
        this.addEventListeners();
        // this.startAutoplay(); // Uncomment to enable autoplay
    }

    createDots() {
        this.dotsContainer.innerHTML = ''; // Clear existing dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`);
            dot.dataset.slideTo = index;
            if (index === this.currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            }
            this.dotsContainer.appendChild(dot);
        });
        this.dots = Array.from(this.dotsContainer.querySelectorAll('button'));
    }

    updateCarousel() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        if (this.dots && this.dots.length > 0) {
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-selected', 'false');
                }
            });
        }
        
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex === this.totalSlides - 1;
    }

    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.totalSlides - 1));
        this.updateCarousel();
    }

    next() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    // --- Autoplay functionality (optional) ---
    // startAutoplay() {
    //     this.stopAutoplay(); // Clear existing interval if any
    //     this.autoplayInterval = setInterval(() => {
    //         this.next();
    //         if (this.currentIndex === this.totalSlides - 1) { // Loop back to start
    //             this.currentIndex = -1; // So next() will go to 0
    //         }
    //     }, this.autoplayDelay);
    // }

    // stopAutoplay() {
    //     clearInterval(this.autoplayInterval);
    // }

    addEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.prev();
            // this.stopAutoplay(); // Optional: Stop autoplay on manual interaction
            // this.startAutoplay(); // Optional: Restart autoplay timer
        });
        this.nextButton.addEventListener('click', () => {
            this.next();
            // this.stopAutoplay();
            // this.startAutoplay();
        });

        if (this.dots && this.dots.length > 0) {
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    this.goToSlide(parseInt(e.target.dataset.slideTo));
                    // this.stopAutoplay();
                    // this.startAutoplay();
                });
            });
        }
        // Optional: Pause autoplay on hover
        // this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        // this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }
}


class App {
    constructor() {
        this.api = new ApiService();
        this.store = new Store();
        this.initComponents();
        this.initEventListeners();
        this.initApp();
    }

    initComponents() {
        this.modal = new ModalComponent(this.store); // Ensure modal is initialized before search
        this.search = new SearchComponent(this.store, this.modal);
        this.promoCarousel = new PromoCarousel('promo-carousel'); // Initialize Promo Carousel
        this.sliders = {
            accesorios: new ProductSlider('#accesoriosSlider', this.store),
            ofertas: new ProductSlider('#ofertasSlider', this.store)
        };
        this.cart = new CartComponent(this.store);
        this.notifications = new NotificationComponent(this.store);
    }

    initEventListeners() {
        const categoryNav = document.getElementById('category-nav-buttons');
        const sortOptions = document.getElementById('sortOptions');
        const mainContent = document.querySelector('main'); // Changed from body to main for specificity

        if (categoryNav) {
            categoryNav.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' && e.target.dataset.category) {
                    const activeBtn = categoryNav.querySelector('.active');
                    if (activeBtn) activeBtn.classList.remove('active');
                    e.target.classList.add('active');
                    this.store.setFilters({ category: e.target.dataset.category });
                }
            });
        }

        if (sortOptions) {
            sortOptions.addEventListener('change', (e) => {
                this.store.setFilters({ sort: e.target.value });
            });
        }

        if (mainContent) {
            mainContent.addEventListener('click', (e) => {
                const button = e.target.closest('[data-action]');
                if (!button) return;
                
                const action = button.dataset.action;
                const card = button.closest('.product-card');
                if (!card || !card.dataset.productId) return; // Ensure card and productId exist
                
                const productId = card.dataset.productId;
                if (action === 'openModal') { 
                    e.preventDefault(); 
                    this.modal.open(productId); 
                }
                if (action === 'addToCart') { 
                    e.preventDefault(); 
                    this.store.addToCart(productId); 
                }
            });
        }
    }

    async initApp() {
        const loader = document.getElementById('global-loader');
        try {
            const products = await this.api.getProducts();
            this.store.setProducts(products); // This will trigger rendering of product sliders
        } catch (error) {
            console.error('Failed to initialize the app:', error);
            if(this.store) this.store.publish('notification', { message: 'Error al cargar los productos.' });
        } finally {
            if (loader) {
                loader.style.opacity = '0';
                // Use 'transitionend' for smoother removal after fade out
                loader.addEventListener('transitionend', () => loader.remove(), { once: true });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});