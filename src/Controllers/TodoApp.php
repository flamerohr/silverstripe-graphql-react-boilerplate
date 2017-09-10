<?php
namespace Flamerohr\Todo\Controllers;

use Exception;
use Flamerohr\Todo\Models\Todo;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\ORM\DataList;
use SilverStripe\ORM\DataModel;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\Security\PermissionProvider;

class TodoApp extends Controller implements PermissionProvider
{
    /**
     * Sets the base uri for the application
     *
     * @var string
     */
    private static $app_root = '/todo/';

    public function getAppRootUri()
    {
        return $this->config()->app_root;
    }

    public function getApiUrl()
    {
        return Controller::join_links(Director::baseURL(), 'graphql');
    }

    /**
     * @param DataObjectInterface$obj
     * @param $args
     * @param $context
     * @param ResolveInfo $info
     * @return DataList $list
     * @throws Exception
     */
    public function readResolver(DataObjectInterface $obj, $args, $context, ResolveInfo $info)
    {
        if (!singleton(Todo::class)->canView($context['currentMember'])) {
            throw new Exception('Cannot view Todo');
        }
        $list = Todo::get();
        if (isset($args['ID'])) {
            $list = $list->filter('ID', $args['ID']);
        }

        return $list;
    }

    public function providePermissions()
    {
        return [
            // add something if GraphQL permissions are not null
        ];
    }
}
