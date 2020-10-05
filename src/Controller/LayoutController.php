<?php


namespace App\Controller;


use App\Service\CommandService;
use App\Service\MinecraftServerService;
use App\Service\SshService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class LayoutController extends AbstractController
{
    /**
     * @var UrlGeneratorInterface
     */
    private $router;

    public function __construct(UrlGeneratorInterface $router)
    {
        $this->router = $router;
    }

    /**
     * @Route("/app_main_menu", name="app_main_menu")
     */
    public function mainMenu (Request $request) {
        $current = $request->get('current');
        $menu = [
            ['label'=>'Chat', 'href'=>$this->router->generate('chatIndexAction'), 'isActive'=>$current=='chatIndexAction' || $current=='app_main'],
//            ['label'=>'Console', 'href'=>$this->router->generate('console'), 'isActive'=>$current=='console'],
//            ['label'=>'Control Panel', 'href'=>$this->router->generate('control_panel'), 'isActive'=>$current=='control_panel'],
//            ['label'=>'Players', 'href'=>$this->router->generate('players'), 'isActive'=>$current=='players'],
//            ['label'=>'Logs', 'href'=>$this->router->generate('logs_index'), 'isActive'=>$current=='logs_index'],
//            ['label'=>'Backups', 'href'=>$this->router->generate('backup_index'), 'isActive'=>$current=='backup_index'],
        ];

        return $this->render('layout/main_menu.html.twig', [
            'menu' => $menu
        ]);
    }
}