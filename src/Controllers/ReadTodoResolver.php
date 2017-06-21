<?php
namespace Flamerohr\Todo\Controllers;

use Exception;
use Flamerohr\Todo\Models\Todo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class ReadTodoResolver implements ResolverInterface
{
    public function resolve($object, $args, $context, $info)
    {
        $todo = Todo::singleton();
        if (!$todo->canView($context['currentUser'])) {
            throw new Exception('Cannot view Todo');
        }
        $list = Todo::get();
        if (isset($args['ID'])) {
            $list = $list->filter('ID', $args['ID']);
        }
    
        return $list;
    }
}
