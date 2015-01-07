<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Content.joomla
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Example Content Plugin
 *
 * @package     Joomla.Plugin
 * @subpackage  Content.Map2gis
 * @since       1.6
 */
class PlgContentMap2gis extends JPlugin
{
	
	const MAP_PLG  = '/plugins/content/map2gis/assets/js/map2gis.js';
	const JQUERY   = ';(function($){ $(function(){ $("#%s").map2gis(%s); }); })(jQuery);';
	
	public function onContentBeforeDisplay($context, $row, $params, $limitstart)
	{
		static $initialized;
		
		if (JString::strpos($row->text, 'class="map2gis"') === FALSE)
		{
			return TRUE;
		}
		
		if( ! isset($initialized)){
			JHtml::_('jquery.framework', FALSE);
			JFactory::getDocument()
				->addScript(self::MAP_PLG);
			$initialized = TRUE;
		}
		
		if(preg_match('/<div(.*)id="([^"]*)"(.*)class="map2gis"(.*)data-params="([^"]*)"([^>]*)>(.*)<\/div>/isU', $row->text, $match)){
			$id         = $match[2];
			$options    = $match[5];
			$script     = sprintf(self::JQUERY, $id, $options);
			
			JFactory::getDocument()->addScriptDeclaration($script);
		}
		
		return TRUE;
	}
	
}
