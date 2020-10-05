<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    /**
     * @Route("/", name="app_main")
     * @Route("/index", name="chatIndexAction")
     */
    public function indexAction ()
    {
        return $this->render('chat/index.html.twig');
    }
}