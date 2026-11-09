/**
 * ============================================================================
 * PORTFOLIO BTS SIO SISR - JORDANN VICENTE GUIA
 * Script interactif sobre & performant
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTerminal();
    initSkillTabs();
    initClipboard();
    initContactForm();
    initActiveNav();
    initCvModal();
});

/**
 * 1. Gestion du menu mobile
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileMenu) return;

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark text-xl"></i>';
            menuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            toggleMenu();
        }
    });
}

/**
 * 2. Détection et surbrillance du lien actif selon l'URL
 */
function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const desktopLinks = document.querySelectorAll('.desktop-nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function checkActive(link) {
        const href = link.getAttribute('href');
        if (!href) return false;
        const targetPath = href.split('/').pop().split('#')[0] || 'index.html';
        return currentPath === targetPath || (currentPath === '' && targetPath === 'index.html');
    }

    desktopLinks.forEach(link => {
        if (checkActive(link)) {
            link.classList.remove('text-slate-400');
            link.classList.add('text-white', 'font-semibold', 'border-b-2', 'border-blue-500', 'pb-1');
        }
    });

    mobileLinks.forEach(link => {
        if (checkActive(link)) {
            link.classList.add('bg-slate-800', 'text-white', 'font-semibold');
        }
    });
}

/**
 * 3. Simulateur de Shell Linux (sobre, typé Debian)
 */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

    if (!input || !output) return;

    const commands = {
        'help': () => `
<span class="text-slate-400">Commandes disponibles :</span>
  <span class="text-blue-400 font-mono">whoami</span>    : Identité, statut et formation
  <span class="text-blue-400 font-mono">homelab</span>   : Architecture Proxmox VE, VM Debian et services
  <span class="text-blue-400 font-mono">stage</span>     : Missions réalisées à Orléans Métropole / Olivet
  <span class="text-blue-400 font-mono">skills</span>    : Compétences acquises en formation
  <span class="text-blue-400 font-mono">veille</span>    : Sujets de veille technologique (ZTNA vs VPN)
  <span class="text-blue-400 font-mono">ping</span>      : Test de connectivité vers maison.lan
  <span class="text-blue-400 font-mono">contact</span>   : Téléphone, e-mail et localisation
  <span class="text-blue-400 font-mono">cv</span>        : Télécharger le CV (PDF)
  <span class="text-blue-400 font-mono">clear</span>     : Effacer la console
`,
        'whoami': () => `
Nom          : Jordann VICENTE GUIA
Statut       : Étudiant en BTS SIO SISR (2ème année)
Établissement: Lycée Benjamin Franklin (Orléans)
Recherche    : Stage de 2ème année / Alternance bac+3
Mobilité     : Tigy (45510) — Permis B
`,
        'homelab': () => `
[Infrastructure Homelab — Domaine : maison.lan]
• Hôte : Proxmox VE (Hyperviseur KVM)
• VM   : Debian GNU/Linux 12
• Services Docker :
  - NPM (Nginx Proxy Manager) : Reverse proxy & SSL
  - Technitium DNS : Résolveur DNS local pour *.maison.lan
  - Vaultwarden : Gestionnaire de mots de passe chiffré
  - PostgreSQL : SGBD relationnel
  - FreshRSS : Agrégateur RSS pour la veille BTS SIO
  - Jellyfin & Navidrome : Médias et musique
  - Dockhand : Gestion des conteneurs
• Bare Metal sur Debian :
  - Nextcloud (optimisé PHP-FPM + Redis Cache)
➔ Page dédiée : homelab.html
`,
        'stage': () => `
[Stage BTS 1A — Mairie d'Olivet / Orléans Métropole]
Dates : 18 mai 2026 au 3 juillet 2026 (7 semaines)
• Configuration de switchs Aruba avec authentification 802.1x
• Analyse de trafic et règles sur pare-feu Palo Alto
• Règles strictes sur serveur RADIUS (Aruba ClearPass)
• Mise en conformité de copieurs réseau (passage en DHCP)
➔ Page dédiée : parcours.html
`,
        'skills': () => `
[Compétences acquises en formation — Bac NSI / BTS SIO SISR]
• Réseaux   : IPv4, IPv6, VLAN, Spanning tree, Cisco, Wireshark
• Systèmes  : Windows, Linux, Poste client, Partages FAT/NTFS, Sauvegardes, Virtualisation
• Sécurité  : Pare-feu & filtrage, Identité numérique
• Dev / Web : Python, PHP, Java, JavaScript, HTML, CSS
(Le stage de 1ère année est une expérience : voir la commande 'stage')
➔ Page dédiée : competences.html
`,
        'veille': () => `
[Veille Technologique BTS SIO SISR]
Thème : Le modèle Zero Trust (ZTNA) face au VPN standard
3 Articles de référence analysés (Utilité, Avantages, Limites) :
• Article 1 : Cloudflare — VPN vs ZTNA (Accès couche 7 & invisibilité)
• Article 2 : ANSSI — Doctrine nationale, opportunités & dépendance IdP
• Article 3 : NIST SP 800-207 — Référentiel international Zero Trust
Outil : Curation quotidienne sur FreshRSS (rss.maison.lan)
➔ Page dédiée : veille.html
`,
        'ping': () => `
PING vault.maison.lan (192.168.1.100) 56(84) bytes of data.
64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=0.312 ms
64 bytes from 192.168.1.100: icmp_seq=2 ttl=64 time=0.298 ms
64 bytes from 192.168.1.100: icmp_seq=3 ttl=64 time=0.304 ms
--- vault.maison.lan ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max = 0.298/0.304/0.312 ms
`,
        'contact': () => `
E-mail     : vicenteguiajordann@gmail.com
Téléphone  : 06 40 41 37 74
Adresse    : 45510 Tigy, Loiret
Permis     : B (véhiculé)
➔ Page dédiée : contact.html
`,
        'cv': () => {
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'CV_Jordann_VICENTE_GUIA_BTS_SIO_SISR.pdf';
            link.click();
            return `<span class="text-emerald-400">Téléchargement lancé : cv.pdf</span>`;
        },
        'clear': () => {
            output.innerHTML = '';
            return null;
        }
    };

    function executeCommand(cmdText) {
        const cleanCmd = cmdText.trim().toLowerCase();
        if (!cleanCmd) return;

        const userLine = document.createElement('div');
        userLine.className = 'mt-2 text-slate-300 font-mono';
        userLine.innerHTML = `<span class="text-slate-500">jordann@maison:~$</span> <span class="text-white">${escapeHtml(cleanCmd)}</span>`;
        output.appendChild(userLine);

        if (commands[cleanCmd]) {
            const res = commands[cleanCmd]();
            if (res !== null) {
                const resLine = document.createElement('div');
                resLine.className = 'text-slate-300 font-mono text-xs whitespace-pre-wrap ml-1 leading-relaxed';
                resLine.innerHTML = res;
                output.appendChild(resLine);
            }
        } else {
            const errLine = document.createElement('div');
            errLine.className = 'text-red-400 font-mono text-xs ml-1 mt-1';
            errLine.innerHTML = `Commande introuvable: ${escapeHtml(cleanCmd)}. Tapez <span class="text-blue-400 underline cursor-pointer" onclick="window.runQuickCmd('help')">help</span> pour voir la liste.`;
            output.appendChild(errLine);
        }

        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value;
            input.value = '';
            executeCommand(val);
        }
    });

    window.runQuickCmd = function(cmd) {
        executeCommand(cmd);
        input.focus();
    };

    quickCmdBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) window.runQuickCmd(cmd);
        });
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

/**
 * 4. Onglets de compétences (Catégories)
 */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab-btn');
    const panels = document.querySelectorAll('.skill-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            tabs.forEach(t => {
                t.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
                t.classList.add('bg-slate-800', 'text-slate-400', 'border-transparent');
            });

            tab.classList.remove('bg-slate-800', 'text-slate-400', 'border-transparent');
            tab.classList.add('bg-blue-600', 'text-white', 'border-blue-500');

            panels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * 5. Copie dans le presse-papier avec feedback simple
 */
function initClipboard() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    let toastTimer = null;
    window.showToast = function(msg) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            const fallbackCopy = () => {
                const ta = document.createElement('textarea');
                ta.value = textToCopy;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                let ok = false;
                try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
                document.body.removeChild(ta);
                showToast(ok ? `Copié : ${textToCopy}` : 'Copie impossible, sélectionnez le texte manuellement.');
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => showToast(`Copié : ${textToCopy}`))
                    .catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });
    });
}

/**
 * 6. Gestion du formulaire de contact
 */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Envoi en cours...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Message transmis';

            window.showToast("Message prêt : ouvrez votre messagerie pour l'envoyer.");

            const name = form.querySelector('#name')?.value || '';
            const email = form.querySelector('#email')?.value || '';
            const subject = form.querySelector('#subject')?.value || 'Contact Portfolio BTS SIO';
            const message = form.querySelector('#message')?.value || '';

            const mailtoUri = `mailto:vicenteguiajordann@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Nom: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
            
            const mailtoBanner = document.getElementById('contact-mailto-fallback');
            if (mailtoBanner) {
                mailtoBanner.classList.remove('hidden');
                const link = mailtoBanner.querySelector('a');
                if (link) link.href = mailtoUri;
            }

            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
            }, 4000);
        }, 800);
    });
}

/**
 * 7. Prévisualisation du CV
 */
function initCvModal() {
    const openBtns = document.querySelectorAll('.preview-cv-btn');
    const closeBtn = document.getElementById('close-cv-modal');
    const modal = document.getElementById('cv-modal');
    const backdrop = document.getElementById('cv-modal-backdrop');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
