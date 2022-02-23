import unittest
from PIL import Image
import torch
import numpy as np
import torcheck
from scipy import stats
from ai_filters.Style_GAN.model import *


class NNComponentsTestCase(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def _testConvInputParameters(self, component):
        x = torch.rand((5, 1, 100, 150))
        for i in [0, 2]:
            params = [1] * 4
            params[i] = 0
            with self.subTest(i=i):
                with self.assertRaises(ZeroDivisionError):
                    _ = component(*params)
        for i in [1, 3]:
            with self.subTest(i=i):
                params = [1] * 4
                params[i] = 0
                comp = component(*params)
                with self.assertRaises(RuntimeError):
                    _ = comp.forward(x)
        with self.subTest(i=4):
            comp = component(1, 16, 200, 1)
            with self.assertRaises(RuntimeError):
                _ = comp.forward(x)

    def _testInvalidInput(self, component, err=ValueError):
        x_dim3 = torch.rand((5, 3, 100))
        x_dim5 = torch.rand((1, 5, 3, 100, 150))
        for i, x in enumerate([x_dim3, x_dim5]):
            with self.subTest(i=i):
                with self.assertRaises(err):
                    _ = component.forward(x)

    def testCommonGramMatrix(self):
        (b, ch, h, w) = (5, 3, 100, 200)
        y = torch.rand((b, ch, h, w))
        gm = GramMatrix()
        result = gm.forward(y)

        self.assertEqual(result.dtype, y.dtype)
        self.assertEqual(False, torch.isnan(result).any())
        self.assertEqual(False, torch.isinf(result).any())
        self.assertEqual(result.shape, (b, ch, ch))

    def testGramMatrixWithInvalidInput(self):
        self._testInvalidInput(GramMatrix())

    def testInspirationWeightsDistribution(self):
        insp = Inspiration(100)
        weights = insp.weight.data
        self.assertEqual(True, ((weights >= 0.0) & (weights <= 0.02)).all())
        #_, p_k = stats.kstest(weights.view(-1).numpy(), stats.uniform(loc=0.0, scale=0.02).cdf)
        _, p_c = stats.chisquare(weights.view(-1))
        #print(p_c)
        self.assertGreaterEqual(p_c, 0.05)

    def testCommonInspiration(self):
        insp = Inspiration(100, 5)
        x = torch.rand((5, 100, 100))
        result = insp.forward(x)
        self.assertEqual(result.dtype, x.dtype)
        self.assertEqual(result.shape, x.shape)
        self.assertEqual(False, torch.isnan(result).any())
        self.assertEqual(False, torch.isinf(result).any())
        self.assertEqual("Inspiration(N x 100)", insp.__repr__())

        result.mean().backward()
        self.assertIsNotNone(insp.weight.grad)
        self.assertIsNotNone(insp.G.grad)

        target = torch.rand((5, 100, 100))
        insp.setTarget(target)
        result = insp.forward(x)
        self.assertEqual(result.dtype, x.dtype)
        self.assertEqual(result.shape, x.shape)
        self.assertEqual(False, torch.isnan(result).any())
        self.assertEqual(False, torch.isinf(result).any())

    def testInspirationSettingTarget(self):
        insp = Inspiration(100, 5)
        target = Variable(torch.rand((5, 100, 100)), requires_grad=True)
        insp.setTarget(target.detach().clone())
        #torch.testing.assert_close(target, insp.G)
        #torch.testing.assert_allclose(target, insp.G)
        result = torch.equal(target, insp.G)
        self.assertEqual(True, result)

    def testInspirationInvalidInput(self):
        insp = Inspiration(100, 5)
        for i, (B, C) in enumerate([[4, 5], [100, 101]]):
            with self.subTest(i=i):
                x = torch.rand((B, C, C))
                with self.assertRaises(RuntimeError):
                    insp.forward(x)

        for i, (B, C) in enumerate([[4, 5], [100, 101]]):
            with self.subTest(i=i+2):
                x = torch.rand((5, 100, 100))
                target = Variable(torch.rand((B, C, C)), requires_grad=True)
                insp.setTarget(target)
                with self.assertRaises(RuntimeError):
                    insp.forward(x)

    def testCommonConvLayer(self):
        in_channels = 3
        out_channels = 16
        kernel_size = 5
        stride = 3
        width, height = 100, 150
        conv = ConvLayer(in_channels, out_channels, kernel_size, stride)
        x = torch.rand((5, 3, width, height))
        result = conv.forward(x)
        n_width = (width + kernel_size // 2 * 2 - kernel_size) // stride + 1
        n_height = (height + kernel_size // 2 * 2 - kernel_size) // stride + 1
        self.assertEqual(result.shape, (5, out_channels, n_width, n_height))
        self.assertEqual(False, torch.isnan(result).any())
        self.assertEqual(False, torch.isinf(result).any())

    def testConvLayerInvalidParameters(self):
        self._testConvInputParameters(component=ConvLayer)

    def testConvLayerInvalidInput(self):
        self._testInvalidInput(ConvLayer(3, 16, 3, 1), err=RuntimeError)

    def testCommonUpsampleConvLayer(self):
        x = torch.rand((5, 3, 100, 150))
        with self.subTest(i=0):
            up_conv = UpsampleConvLayer(3, 16, 5, 3)
            result = up_conv.forward(x)
            self.assertEqual(result.shape, (5, 16, 34, 50))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=1):
            up_conv = UpsampleConvLayer(3, 16, 5, 3, upsample=2)
            result = up_conv.forward(x)
            self.assertEqual(result.shape, (5, 16, 67, 100))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=2):
            up_conv = UpsampleConvLayer(3, 16, 1, 1)
            result = up_conv.forward(x)
            self.assertEqual(result.shape, (5, 16, 100, 150))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=3):
            up_conv = UpsampleConvLayer(3, 16, 1, 1, upsample=0)
            result = up_conv.forward(x)
            self.assertEqual(result.shape, (5, 16, 100, 150))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=4):
            up_conv = UpsampleConvLayer(3, 16, 1, 1, upsample=0.4)
            result = up_conv.forward(x)
            self.assertEqual(result.shape, (5, 16, 40, 60))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())

    def testUpsampleConvLayerInvalidParameters(self):
        self._testConvInputParameters(component=UpsampleConvLayer)

    def testUpsampleConvLayerInvalidInput(self):
        self._testInvalidInput(UpsampleConvLayer(3, 16, 3, 1), err=RuntimeError)

    def testCommonBottleneck(self):
        x = torch.rand((5, 16, 100, 150))
        with self.subTest(i=0):
            bottleneck = Bottleneck(16, 4)
            result = bottleneck.forward(x)
            self.assertEqual(result.shape, x.shape)
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=1):
            bottleneck = Bottleneck(16, 4, stride=2, downsample=True)
            result = bottleneck.forward(x)
            print(bottleneck.named_children())
            try:
                layer = bottleneck.get_submodule("residual_layer")
            except AttributeError:
                layer = None
            self.assertEqual(result.shape, (5, 16, 50, 75))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
            self.assertIsNotNone(layer)
        with self.subTest(i=2):
            bottleneck = Bottleneck(16, 4, norm_layer=nn.InstanceNorm2d)
            result = bottleneck.forward(x)
            norm_layers_num = [1 if isinstance(module, nn.InstanceNorm2d) else
                               -1 if isinstance(module, nn.BatchNorm2d) else
                               0 for module in bottleneck.modules()]
            self.assertEqual(result.shape, x.shape)
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
            self.assertEqual(sum(norm_layers_num), 3)

    def testBottleneckInvalidInput(self):
        with self.subTest(i=0):
            self._testInvalidInput(Bottleneck(16, 4))
        with self.subTest(i=1):
            self._testInvalidInput(Bottleneck(16, 4, downsample=True), err=RuntimeError)

    def testCommonUpBottleneck(self):
        x = torch.rand((5, 16, 100, 150))
        with self.subTest(i=0):
            up_bottleneck = UpBottleneck(16, 4, stride=3)
            result = up_bottleneck.forward(x)
            self.assertEqual(result.shape, (5, 16, 300, 450))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=1):
            up_bottleneck = UpBottleneck(16, 4, norm_layer=nn.InstanceNorm2d)
            result = up_bottleneck.forward(x)
            norm_layers_num = [1 if isinstance(module, nn.InstanceNorm2d) else
                               -1 if isinstance(module, nn.BatchNorm2d) else
                               0 for module in up_bottleneck.modules()]
            self.assertEqual(result.shape, (5, 16, 200, 300))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
            self.assertEqual(sum(norm_layers_num), 3)

    def testUpBottleneckInvalidInput(self):
        self._testInvalidInput(UpBottleneck(16, 4), err=RuntimeError)

    def testCommonNet(self):
        x = torch.rand(5, 3, 100, 150)
        with self.subTest(i=0):
            model = Net()
            result = model.forward(x)
            self.assertEqual(result.shape, (5, 3, 100, 152))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
        with self.subTest(i=1):
            model = Net(norm_layer=nn.BatchNorm2d)
            result = model.forward(x)
            norm_layers_num = [-1 if isinstance(module, nn.InstanceNorm2d) else
                               1 if isinstance(module, nn.BatchNorm2d) else
                               0 for module in model.modules()]
            self.assertEqual(result.shape, (5, 3, 100, 152))
            self.assertEqual(False, torch.isnan(result).any())
            self.assertEqual(False, torch.isinf(result).any())
            self.assertEqual(sum(norm_layers_num), 32)




