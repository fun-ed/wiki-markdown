/**
 * Islands Orchestrator
 * Entry point for the content script.
 * Initializes the message bus and all islands.
 *
 * Each island is self-contained and communicates only through the message bus.
 * New islands can be added here without modifying existing ones (Open-Closed).
 */
import { initMessageBus } from './message-bus.js';
import { initExtractorIsland } from './extractor.js';
import { initInserterIsland } from './inserter.js';
import { initHtmlExporterIsland } from './html-exporter.js';
import { initShortcutHandlerIsland } from './shortcut-handler.js';
import { initAttachmentCollectorIsland } from './attachment-collector.js';

// Boot sequence: initialize message bus, then register all islands
initMessageBus();
initExtractorIsland();
initInserterIsland();
initHtmlExporterIsland();
initShortcutHandlerIsland();
initAttachmentCollectorIsland();
