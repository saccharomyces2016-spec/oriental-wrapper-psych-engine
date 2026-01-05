// src/core/content/resultTemplates/loader.js
// M-8.3: Loader for result templates including anchor statements

import attributionErrorMatrix from './attribution_error_matrix.v1.json'
import interventionBoundaryMatrix from './intervention_boundary_matrix.v1.json'
import consequenceChainLibrary from './consequence_chain_library.v1.json'
import fiveElementMapping from './five_element_mapping.v1.json'
import anchorStatements from './anchor_statements.v1.json'

const TEMPLATES = {
  attribution_error_matrix: attributionErrorMatrix,
  intervention_boundary_matrix: interventionBoundaryMatrix,
  consequence_chain_library: consequenceChainLibrary,
  five_element_mapping: fiveElementMapping,
  anchor_statements: anchorStatements
}

/**
 * Load a template by name
 * @param {string} templateName - Template name (e.g., 'anchor_statements')
 * @returns {Object|null} Template object with meta and items
 */
export function loadTemplate(templateName) {
  return TEMPLATES[templateName] || null
}

/**
 * Get an item from a template by ID
 * @param {string} templateName - Template name
 * @param {string} itemId - Item ID
 * @returns {Object|null} Item object
 */
export function getTemplateItem(templateName, itemId) {
  const template = loadTemplate(templateName)
  if (!template || !Array.isArray(template.items)) return null
  return template.items.find(item => item.id === itemId) || null
}

/**
 * Get all items from a template
 * @param {string} templateName - Template name
 * @returns {Array} Array of items
 */
export function getTemplateItems(templateName) {
  const template = loadTemplate(templateName)
  return Array.isArray(template?.items) ? template.items : []
}








