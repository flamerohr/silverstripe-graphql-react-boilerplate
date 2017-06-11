<?php
namespace Flamerohr\Todo\Controllers;

use SilverStripe\Control\Controller;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\ORM\DataModel;
use SilverStripe\Security\PermissionProvider;

class TodoApp extends Controller implements PermissionProvider
{
    /**
     * Sets the base uri for the application
     *
     * @var string
     */
    private static $app_root = '/todo/';
    
    public function handleRequest(HTTPRequest $request, DataModel $model = null)
    {
        return $this->renderWith(static::class, [
            'AppRootUri' => $this->config()->app_root,
            'ApiUrl' => Controller::join_links(Director::baseURL(), 'graphql'),
        ])->forTemplate();
    }
    
    public function providePermissions()
    {
        return [
            // add something if GraphQL permissions are not null
        ];
    }
}
