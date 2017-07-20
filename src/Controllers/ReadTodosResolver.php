<?php
namespace Flamerohr\Todo\Controllers;

use Exception;
use Flamerohr\Todo\Models\Todo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class ReadTodosResolver implements ResolverInterface
{
    public function resolve($object, $args, $context, $info)
    {
        $todo = Todo::singleton();
        if (!$todo->canView($context['currentUser'])) {
            throw new Exception('Cannot view Todo');
        }
        
        $list = Todo::get()->sort('Order', 'ASC');
        if (isset($args['ID'])) {
            $list = $list->filter('ID', $args['ID']);
        }
        if (isset($args['Description'])) {
            $list = $list->filter('Description:PartialMatch', $args['Description']);
        }
        if (isset($args['IsDone'])) {
            $list = $list->filter('IsDone', $args['IsDone']);
        }
    
        return $list;
    }
}
