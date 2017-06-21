<?php
namespace Flamerohr\Todo\Models;

use SilverStripe\ORM\DataObject;

class Todo extends DataObject
{
    private static $table_name = 'Todo';
    
    private static $db = [
        'IsDone' => 'Boolean',
        'Description' => 'Text',
        'Order' => 'Int',
        'Secret' => 'Varchar(255)',
    ];
    
    public function canView($member = null)
    {
        return true;
    }
    
    public function canEdit($member = null)
    {
        return true;
    }
    
    public function canCreate($member = null, $context = array())
    {
        return true;
    }
    
    public function canDelete($member = null)
    {
        return true;
    }
}
